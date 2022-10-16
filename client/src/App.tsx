import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Login/Dashboard";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const setAuth = (boolean: boolean) => {
		setIsAuth(boolean);
	};
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/login"
						element={
							!isAuth ? (
								<Login setAuth={setAuth} />
							) : (
								<Navigate to="/dashboard" />
							)
						}
					/>
					<Route
						path="/dashboard"
						element={
							isAuth ? (
								<Dashboard setAuth={setAuth} />
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route path="/register" element={<Register />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
