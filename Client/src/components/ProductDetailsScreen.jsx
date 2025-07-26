import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, placeOrder } from "../services/product";
import { toast } from "react-toastify";

const ProductDetailsScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
        toast.error("⚠️ Failed to fetch product details");
      }
    };
    loadProductDetails();
  }, [id]);

  const handleBuyNow = async () => {
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
  };

  if (!product)
    return <p className="text-center mt-5 text-white">⏳ Loading product details...</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
        padding: "50px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="shadow-lg"
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "30px",
          color: "#fff",
        }}
      >
        <div className="row g-4 align-items-center">
          <div className="col-md-6 text-center">
            <img
              src={`http://localhost:3000/product/download/${product.image}`}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6">
            <h2 style={{ fontWeight: "700", color: "#fff" }}>{product.name}</h2>
            <p className="mt-3">
              <span style={{ fontWeight: "600", color: "#ccc" }}>Description:</span>{" "}
              {product.description}
            </p>
            <p>
              <span style={{ fontWeight: "600", color: "#ccc" }}>Specification:</span>{" "}
              {product.specification}
            </p>
            <p>
              <span style={{ fontWeight: "600", color: "#ccc" }}>Warranty:</span>{" "}
              {product.warranty_period} months
            </p>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#00ffae" }}>
              ₹{product.price}
            </p>

            <button
              className="btn btn-light w-100 mt-3"
              onClick={handleBuyNow}
              disabled={ordering}
              style={{
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "1.1rem",
                padding: "12px",
                color: "#000",
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
