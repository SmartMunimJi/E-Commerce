import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, placeOrder } from "../services/product";
import { toast } from "react-toastify";

const ProductDetailsScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ordering, setOrdering] = useState(false);

  async function loadProductDetails() {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Failed to fetch product details");
    }
  }

  async function handleBuyNow() {
    try {
      setOrdering(true);
      const result = await placeOrder(product.id);
      toast.success(`🎉 Order placed! Order ID: ${result.order_id}`);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to place order. Please try again.");
    } finally {
      setOrdering(false);
    }
  }

  useEffect(() => {
    loadProductDetails();
  }, [id]);

  if (!product)
    return <p className="text-center mt-4">⏳ Loading product details...</p>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "700px",
          borderRadius: "20px",
          background: "#f9f9f9",
          color: "#000", // ✅ Set text color to black
        }}
      >
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={`http://localhost:3000/product/download/${product.image}`}
              alt={product.name}
              className="img-fluid"
              style={{ maxHeight: "300px", borderRadius: "12px" }}
            />
          </div>

          <div className="col-md-6">
            <h3 className="mb-3" style={{ fontWeight: "600" }}>
              {product.name}
            </h3>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Specification:</strong> {product.specification}
            </p>
            <p>
              <strong>Warranty:</strong> {product.warranty_period} months
            </p>
            <p style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#007bff" }}>
              ₹{product.price}
            </p>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handleBuyNow}
              disabled={ordering}
              style={{
                borderRadius: "10px",
                fontWeight: "500",
                fontSize: "1rem",
                padding: "10px",
              }}
            >
              {ordering ? "Placing Order..." : "🛒 Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsScreen;
