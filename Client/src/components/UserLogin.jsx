import { useState, useEffect } from "react";
import { userSignIn } from "../services/user";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		// Set full page background
		document.body.style.margin = "0";
		document.body.style.height = "100vh";
		document.body.style.background = "linear-gradient(to right, #232526, #414345)";
		document.body.style.display = "flex";
		document.body.style.alignItems = "center";
		document.body.style.justifyContent = "center";

		// Cleanup on unmount
		return () => {
			document.body.style = null;
		};
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const user = await userSignIn(email, password);
			sessionStorage.setItem("user", JSON.stringify(user));
			toast.success("Login successful!", { position: "top-center" });
			setTimeout(() => navigate("/productscreen"), 1500);
		} catch (err) {
			toast.error("Login failed: " + err.message, { position: "top-center" });
			setError(err.message);
		}
	};

	const styles = {
		box: {
			backgroundColor: "rgba(0, 0, 0, 0.7)",
			padding: "2rem",
			borderRadius: "15px",
			width: "100%",
			maxWidth: "400px",
			color: "white",
		},
		input: {
			marginBottom: "1rem",
		},
		label: {
			textAlign: "left",
			display: "block",
			marginBottom: "5px",
			fontWeight: "bold",
		},
		button: {
			width: "100%",
			fontWeight: "600",
		},
		link: {
			color: "#0dcaf0",
			fontWeight: "600",
			textDecoration: "none",
		},
	};

	return (
		<>
			<ToastContainer />
			<div style={styles.box}>
				<h2 className="text-center fw-bold mb-4">User Login</h2>
				<form onSubmit={handleLogin}>
					<div style={styles.input}>
						<label style={styles.label}>Email:</label>
						<input
							type="email"
							className="form-control"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div style={styles.input}>
						<label style={styles.label}>Password:</label>
						<input
							type="password"
							className="form-control"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="btn btn-primary" style={styles.button}>
						Login
					</button>
				</form>
				<div className="mt-3 text-center">
					<span>Don't have an account? </span>
					<Link to="/register" style={styles.link}>
						Register here
					</Link>
				</div>
			</div>
		</>
	);
};

export default UserLogin;
