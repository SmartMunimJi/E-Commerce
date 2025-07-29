import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, placeOrder } from "../services/product";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ProductDetailsScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ordering, setOrdering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState({
    customerName: "",
    mobile: "",
    address: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

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

  const handleBuyNow = () => {
    setShowModal(true);
  };

  const confirmOrder = async () => {
    if (!orderData.address || !orderData.mobile) {
      toast.warning("📌 Please provide both address and mobile number");
      return;
    }

    try {
      setOrdering(true);
      const result = await placeOrder(product.id, orderData); // Send address & mobile
      setOrderSummary(result);
      setShowSuccess(true);
      toast.dismiss(); // Close any previous toasts
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to place order. Please try again.");
    } finally {
      setOrdering(false);
      setShowModal(false);
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

      {/* Modal to take input */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter Delivery Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Optional"
                value={orderData.customerName}
                onChange={(e) =>
                  setOrderData({ ...orderData, customerName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Required"
                value={orderData.mobile}
                onChange={(e) =>
                  setOrderData({ ...orderData, mobile: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Delivery Address"
                value={orderData.address}
                onChange={(e) =>
                  setOrderData({ ...orderData, address: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmOrder}>
            {ordering ? "Placing..." : "Confirm Order"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🎉 Order Placed Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Order ID:</strong> {orderSummary?.order_id}</p>
          <p><strong>Product:</strong> {product?.name}</p>
          <p><strong>Amount Paid:</strong> ₹{product?.price}</p>
          <p><strong>Will be delivered to:</strong></p>
          <p>{orderData.address}</p>
          <p><strong>Contact:</strong> {orderData.mobile}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccess(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetailsScreen;
