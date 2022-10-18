import React, { useState } from "react";
import { Navigate } from "react-router-dom";

type RegisterArgs = {
	setAuth: Function;
};

export default function Register({ setAuth }: RegisterArgs) {
	const [inputs, setInputs] = useState({
		email: "",
		name: "",
		password: "",
		password_copy: "",
	});
	const { email, name, password, password_copy } = inputs;

	const handleChange = (e: any): void => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			if ([email, name, password, password_copy].every(Boolean)) {
				const response = await fetch(
					"http://localhost:8080/auth/register",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password, name }),
					}
				);
				const parseRes = await response.json();
				localStorage.setItem("token", parseRes.token);
				setAuth(true);
			} else {
				console.log("faltan cosas");
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};
	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={e => handleSubmit(e)}>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={email}
					onChange={handleChange}
				/>
				<br />
				<input
					type="name"
					name="name"
					placeholder="name"
					value={name}
					onChange={handleChange}
				/>
				<br />
				<input
					type="password"
					name="password"
					placeholder="Set password"
					value={password}
					onChange={handleChange}
				/>
				<br />
				<input
					type="password_copy"
					name="password_copy"
					placeholder="Verify your password"
					value={password_copy}
					onChange={handleChange}
				/>
				<br />
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
}
