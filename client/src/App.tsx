import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Login/Dashboard";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Navbar from "./Components/Navbar";

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const setAuth = (boolean: boolean) => {
		setIsAuth(boolean);
	};
	async function handleIsAuth() {
		try {
			const response = await fetch(
				"http://localhost:8080/auth/is-verify",
				{
					method: "GET",
					headers: { token: localStorage.token },
				}
			);
			const parseRes = await response.json();
			parseRes === true ? setAuth(true) : setAuth(false);
		} catch (err: any) {
			console.error(err.message);
		}
	}
	useEffect(() => {
		handleIsAuth();
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
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
					<Route
						path="/register"
						element={
							!isAuth ? (
								<Register setAuth={setAuth} />
							) : (
								<Navigate to={"/login"} />
							)
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
