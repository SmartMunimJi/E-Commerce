const express = require('express');
const router = express.Router();
const db = require('../utils/dbpool');  
const { apiError, apiSuccess } = require('../utils/apiresult');


// Utility function to generate payment_id
function generatePaymentId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
}

// POST /orders - place ord
router.post('/placeOrders', (req, resp) => {
  const { user_id, product_id, name, email, phone, address } = req.body;

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
        return resp.status(500).json({ success: false, message: 'error placing order', error: err });
      }
      return resp.status(201).json({
        success: true,
        message: 'Order placed successfully',
        payment_id: payment_id,
        order_id: result.insertId
      });
    }
  );
});

// get all orders 
router.get("/getAllOrders",(req, resp)=> {
    db.query("SELECT * FROM orders", (err, result)=> {
        if(err)
            return resp.send(apiError("no order found"))
        resp.send(apiSuccess(result))
     }
    );
});

// get orders by userid for each user
router.get("/:user_id", (req, resp)=> {
    db.query("SELECT * FROM orders WHERE user_id = ?", [req.params.id], 
        (err, result)=>{
            if(err)
                return resp.send(apiError(err))
            if(result.length !== 1)
              resp.send(apiError("user not found"))
           return resp.send(apiSuccess(result[0]))
        }
    );
});


router.get("/:id", (req, resp)=> {
    db.query("SELECT * FROM orders WHERE id =?", [req.params.id], 
        (err, result)=>{
            if(err)
                return resp.send(apiError(err))
            if(result.length !== 1)
                resp.send(apiError("order not found"))
            return resp.send(apiSuccess(result[0]))

        }
    );
});
 
module.exports = router;
