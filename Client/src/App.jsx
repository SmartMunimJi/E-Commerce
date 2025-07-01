import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import UserDashboard from "./components/UserDashboard";
import ProductScreen from "./components/ProductScreen";
import ProductDetailsScreen from "./components/ProductDetailsScreen";

export const AuthContext = createContext();

function getUserFromSessionStorage() {
	const userJson = sessionStorage.getItem("user");
	return userJson ? JSON.parse(userJson) : null;
}

function App() {
	const [user, setUser] = useState(getUserFromSessionStorage());

	return (
		<div className="container">
			<AuthContext.Provider value={{ user, setUser }}>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/login" element={<UserLogin />} />
					<Route path="/register" element={<UserRegister />} />
					<Route path="/dashboard" element={<UserDashboard />} />
					<Route path="/productscreen" element={< ProductScreen/>}/>
					<Route path="/product/:id" element={<ProductDetailsScreen/>}/>
				</Routes>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
