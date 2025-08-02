const dbpool = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const express = require("express");
const router = express.Router();
const db = dbpool;
const path = require("path");
const fs = require("fs");


// Get all products with full details
router.get("/getAll", (req, resp) => {
  db.query(
    `SELECT p.id, p.name, p.image, d.description, d.price, d.specification, d.warranty_period
     FROM products p
     JOIN product_details d ON p.id = d.product_id`,
    (err, result) => {
      if (err) return resp.send(apiError(err));
      resp.send(apiSuccess(result));
    }
  );
}); 
 // Get only basic product info from `products` table
router.get("/basic", (req, resp) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return resp.send(apiError(err));
    return resp.send(apiSuccess(result));
  });
});

// Get single product by particular ID
router.get("/:id", (req, resp) => {
  db.query(
    `SELECT p.id, p.name, p.image, d.description, d.price, d.specification, d.warranty_period
     FROM products p
     JOIN product_details d ON p.id = d.product_id
     WHERE p.id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) return resp.send(apiError(err));
      if (result.length !== 1)
        return resp.send(apiError("Product not found"));
      return resp.send(apiSuccess(result[0]));
    }
  );
});

// Add new product (filename already provided)
router.post("/addProduct", (req, resp) => {
  const { name, imageFilename, description, price, specification, warranty_period } = req.body;

  if (!name || !imageFilename || !description || !price || !specification || !warranty_period) {
    return resp.status(400).send({ success: false, error: "All fields are required" });
  }

  db.query(
    "INSERT INTO products (name, image) VALUES (?, ?)",
    [name, imageFilename],
    (err, result) => {
      if (err) {
        console.error(err);
        return resp.status(500).send(apiError("Database error on products insert"));
      }

      const productId = result.insertId;

      db.query(
        "INSERT INTO product_details (product_id, description, price, specification, warranty_period) VALUES (?, ?, ?, ?, ?)",
        [productId, description, price, specification, warranty_period],
        (err2, result2) => {
          if (err2) {
            console.error(err2);
            return resp.status(500).send(apiError("Database error on product_details insert"));
          }

          resp.send(apiSuccess("Product added successfully"));
        }
      );
    }
  );
});

// Delete product by ID
router.delete("/:id", (req, resp) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err, result) => {
    if (err) return resp.send(apiError(err));
    if (result.affectedRows === 1) {
      resp.send(apiSuccess("Product deleted"));
    } else {
      resp.send(apiError("Product not found"));
    }
  });
});

// Update product along with the nameS
router.put("/updateProduct/:id", (req, resp) => {
  const productId = req.params.id;
  const { name, description, price, specification, warranty_period } = req.body;

  db.query(
    "UPDATE products SET name = ? WHERE id = ?",
    [name, productId],
    (err, result) => {
      if (err) return resp.status(500).send(apiError("Error updating products table"));

      db.query(
        "UPDATE product_details SET description = ?, price = ?, specification = ?, warranty_period = ? WHERE product_id = ?",
        [description, price, specification, warranty_period, productId],
        (err2, result2) => {
          if (err2) return resp.status(500).send(apiError("Error updating product_details table"));

          resp.send(apiSuccess("Product updated successfully"));
        }
      );
    }
  );
});



// API for downloading image by filename
router.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;

  // absolute path to uploads folder
  const filePath = path.join(__dirname, "..", "uploads", filename);
  
  // check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send({ success: false, message: "Image not found" });
    }
 
    // send file as response
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send({ success: false, message: "Error downloading image" });
      }
    });
  });
});


module.exports = router;



