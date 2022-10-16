import React from "react";

type DashboardArgs = {
	setAuth: Function;
};

export default function Dashboard({ setAuth }: DashboardArgs) {
	return (
		<div>
			<h1>dashboard</h1>
			<button onClick={() => setAuth(false)}>Log out</button>
		</div>
	);
}
