const express = require("express");
const router = express.Router();
const db = require('../utils/dbpool');
const { apiError, apiSuccess } = require('../utils/apiresult');
const { SMART_MUNIMJI_SECRET_KEY } = require("../config");

function generatePaymentId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
}

router.post('/placeOrder', (req, resp) => {
    const user_id = req.user.id;  

    const { product_id, name, email, phone, address } = req.body;

    const payment_id = generatePaymentId();
    const payment_status = 'paid';

    const query = `
        INSERT INTO orders (user_id, product_id, name, email, phone, address, payment_status, payment_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query,
        [user_id, product_id, name, email, phone, address, payment_status, payment_id],
        (err, result) => {
            if (err) {
                console.error(err);
                return resp.status(500).json(apiError("Error placing order"));
            }
            return resp.status(201).json(apiSuccess({
                message: "Order placed successfully",
                payment_id: payment_id,
                order_id: result.insertId
            }));
        }
    );
}); 

router.get("/all", (req, resp) => {
    db.query("SELECT * FROM orders", (err, result) => {
        if (err) return resp.send(apiError(err));
        resp.send(apiSuccess(result));
    });
});

router.get("/user/:user_id", (req, resp) => {
    db.query("SELECT * FROM orders WHERE user_id = ?", [req.params.user_id], (err, result) => {
        if (err) return resp.send(apiError(err));
        resp.send(apiSuccess(result));
    });
});

router.get("/order/:id", (req, resp) => {
    db.query("SELECT * FROM orders WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return resp.send(apiError(err));
        resp.send(apiSuccess(result));
    });
});



router.post("/validatePurchase", (req, resp) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey || apiKey !== SMART_MUNIMJI_SECRET_KEY) {
    return resp.status(401).json(apiError("Unauthorized: Invalid API Key"));
  }

  const { order_id, date_of_purchase, phone } = req.body;

  // Validate request body
  if (!order_id || !date_of_purchase || !phone) {
    return resp.status(400).json(apiError("Missing required fields"));
  }

  const query = `
    SELECT 
      o.id AS order_id,
      o.phone,
      DATE(o.created_at) AS date_of_purchase,
      p.id AS product_id,
      p.name AS product_name,
      p.image AS product_image,
      pd.description,
      pd.price,
      pd.specification,
      pd.warranty_period
    FROM orders o
    JOIN products p ON o.product_id = p.id
    JOIN product_details pd ON pd.product_id = p.id
    WHERE o.id = ? AND DATE(o.created_at) = ? AND o.phone = ?
  `;

  db.query(query, [order_id, date_of_purchase, phone], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return resp.status(500).json(apiError("Internal server error"));
    }

    if (result.length === 0) {
      return resp.status(404).json(apiError("No matching purchase found"));
    }

    return resp.status(200).json(apiSuccess({
      message: "Purchase verified successfully",
      product: result[0]
    }));
  });
});
 

module.exports = router;

