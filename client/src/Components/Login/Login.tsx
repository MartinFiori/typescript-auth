import React from "react";

type LoginArgs = {
	setAuth: Function;
};

export default function Login({ setAuth }: LoginArgs) {
	return (
		<div>
			<h1>Login</h1>
			<button onClick={() => setAuth(true)}>Authenticate</button>
		</div>
	);
}
