import React, { useState } from "react";

export default function Register() {
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
	return (
		<div>
			<h1>Register</h1>
			<form>
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
