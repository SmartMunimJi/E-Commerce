import { Link } from "react-router-dom";
import bgImage from "../assets/ecommerceELEIMG.jpg";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(211, 211, 211, 0.4)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          zIndex: 2,
          textAlign: "center",
          padding: "2rem",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          color: "#fff",
          boxShadow: "0 0 15px rgba(0,0,0,0.5)",
        }}
      >
        <h1 style={{ fontSize: "3.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          ElectroKart ⚡
        </h1>
        <p style={{ fontSize: "1.4rem", maxWidth: "600px", lineHeight: "1.6" }}>
          Discover the latest and greatest in electronics. From smart gadgets to home appliances — all at your fingertips. Shop smart, shop fast, only on ElectroKart!
        </p>
        <Link
          to="/login"
          style={{
            marginTop: "2rem",
            display: "inline-block",
            padding: "12px 28px",
            fontSize: "1.1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            textDecoration: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Login Here
        </Link>
      </div>
    </div>
  );
};

export default Home;
