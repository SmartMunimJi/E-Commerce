import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const styles = {
    card: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#1e1e1e",
      color: "#fff",
      border: "1px solid #444",
      borderRadius: "12px",
      padding: "16px",
      margin: "16px 0", // Removed auto-centering
      width: "100%",     // Full width
      boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      transition: "transform 0.2s ease-in-out",
    },
    wrapper: {
      padding: "0 20px", // Added padding for page edge spacing
      width: "100vw",    // Occupy full viewport width
      boxSizing: "border-box",
    },
    image: {
      width: "180px",
      height: "180px",
      objectFit: "cover",
      borderRadius: "8px",
      marginRight: "24px",
    },
    content: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    name: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    price: {
      fontSize: "1rem",
      marginBottom: "12px",
    },
    button: {
      alignSelf: "flex-start",
      padding: "8px 16px",
      backgroundColor: "#0d6efd",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={styles.card}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={`http://localhost:3000/product/download/${product.image}`}
          alt={product.name}
          style={styles.image}
        />
        <div style={styles.content}>
          <div style={styles.name}>{product.name}</div>
          <div style={styles.price}>
            <b>Touch the banner to get the BEST price:</b> {product.price}
          </div>
          <button style={styles.button}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
