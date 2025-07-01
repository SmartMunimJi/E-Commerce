import { useState } from "react";
import { userSignIn } from "../services/user";
import { useNavigate, Link } from "react-router-dom";

const UserLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const user = await userSignIn(email, password);
			sessionStorage.setItem("user", JSON.stringify(user));
			navigate("/productscreen");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="container mt-4">
			<h2>User Login</h2>
			<form onSubmit={handleLogin}>
				<div className="mb-3">
					<label>Email:</label>
					<input
						type="email"
						className="form-control"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label>Password:</label>
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				{error && <div className="alert alert-danger">{error}</div>}
				<button type="submit" className="btn btn-primary">Login</button>
			</form>

			<div className="mt-3">
				Don't have an account? <Link to="/register">Register here</Link>
			</div>
		</div>
	);
};

export default UserLogin;
