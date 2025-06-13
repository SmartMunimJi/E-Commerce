const dbpool = require("../utils/dbpool")
const {apiSuccess, apiError} = require("../utils/apiresult")
const express = require("express");
const router = express.Router()
const multer = require("multer");
const upload = multer({dest: "uploads"});
const path = require("path");
const { route } = require("./userRoute");


// get all the products for home screen
router.get("/getAll", (req, resp)=> {
    db.query("SELECT * FROM products", (err, result)=>{
        if(err) 
            return resp.send(apiError(err));
        resp.send(apiSuccess(result));
    });
});


router.get("/:id", (req, resp)=>{
      db.query("SELECT * FROM products WHERE id = ?", [req.params.id], 
        (err, result)=> {
            if(err)
                return resp.send(apiError(err))
            if(result.length !== 1 )
                return resp.send(apiError("user not found"))
            return resp.send(apiSuccess(result[0]))
        }
      );

});

// Add product on postman only  img and multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploads = multer({ storage: storage });

// Add Product API 

router.post("/addProduct", upload.single("productimg"), (req, resp) => {
  const { name, description, price, specification, warranty_period } = req.body;
  const imageFilename = req.file ? req.file.filename : null;

  // Insert into products table
  db.query(
    "INSERT INTO products (name, image) VALUES (?, ?)",
    [name, imageFilename],
    (err, result) => {
      if (err) {
        console.error(err);
        return resp.status(500).send({ success: false, error: "Database error on products insert" });
      }

      const productId = result.insertId;

      // Insert into product_details table which will be shown on click on the product card
      db.query(
        "INSERT INTO product_details (product_id, description, price, specification, warranty_period) VALUES (?, ?, ?, ?, ?)",
        [productId, description, price, specification, warranty_period],
        (err2, result2) => {
          if (err2) {
            console.error(err2);
            return resp.status(500).send({ success: false, error: "error adding the details" });
          }

          resp.send({ success: true, message: "Product added successfully" });
        }
      );
    }
  );
});
// deleting the product 
delete("/:id", (req, resp)=> {
    db.query("DELETE FROM products WHERE id=?", [req.params.id], 
        (err, result) => {
            if(err)
                return resp.send(err);
            if(result.affectedRows ===1 ) resp.send(apiSuccess("Product deleted"));
            else resp.send(apiError("Product not found"));
        }
    );
});


// updating the product 
router.put("/update-product/:id", (req, resp) => {
  const productId = req.params.id;
  const { name, description, price, specification, warranty_period } = req.body;

  // Update products table (only name)
  db.query(
    "UPDATE products SET name = ? WHERE id = ?",
    [name, productId],
    (err, result) => {
      if (err) {
        console.error(err);
        return resp.status(500).send({ success: false, error: "Error updating products table" });
      }

      // Update product_details table
      db.query(
        "UPDATE product_details SET description = ?, price = ?, specification = ?, warranty_period = ? WHERE product_id = ?",
        [description, price, specification, warranty_period, productId],
        (err2, result2) => {
          if (err2) {
            console.error(err2);
            return resp.status(500).send({ success: false, error: "Error updating product_details table" });
          }

          resp.send({ success: true, message: "Product updated successfully" });
        }
      );
    }
  );
});



// router.put("/:id", (req, resp) => {
// 	const { title, author, category, price, image_name } = req.body;
// 	db.query(
// 		"UPDATE books SET title=?, author=?, category=?, price=?, image_name=? WHERE id=?",
// 		[title, author, category, price, image_name, req.params.id],
// 		(err, result) => {
// 			if (err) return resp.send(apiError(err));
// 			resp.send(apiSuccess({ id: req.params.id, ...req.body }));
// 		}
// 	);
// });

module.exports = router;