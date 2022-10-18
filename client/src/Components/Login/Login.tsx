import React, { useState } from "react";

type LoginArgs = {
	setAuth: Function;
};

interface UserLogin {
	email: String;
	password: String;
}

export default function Login({ setAuth }: LoginArgs) {
	const [inputs, setInputs] = useState<UserLogin>({
		email: "ddd",
		password: "",
	});
	const { email, password } = inputs;
	const handleChange = (e: any): void => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:8080/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const parseRes = await response.json();
			localStorage.setItem("token", parseRes.token);
			setAuth(true);
		} catch (err: any) {
			console.error(err.message);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					name="email"
					placeholder="email"
					onChange={handleChange}
				/>
				<br />
				<input
					type="password"
					name="password"
					placeholder="password"
					onChange={handleChange}
				/>
				<br />
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
}
