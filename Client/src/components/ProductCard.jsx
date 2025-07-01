import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "250px",
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
        textAlign: "center",
        margin: "10px",
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img
        src={`http://localhost:3000/product/download/${product.image}`}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          marginBottom: "10px",
          borderRadius: "4px",
        }}
      />
      <h4 style={{ margin: "10px 0" }}>{product.name}</h4>
      <p><b>Price:</b> {product.price}</p>
      <button
        style={{
          padding: "8px 12px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          marginTop: "8px",
        }}
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
