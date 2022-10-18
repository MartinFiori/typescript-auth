import React, { useEffect, useState } from "react";

type DashboardArgs = {
	setAuth: Function;
};

export default function Dashboard({ setAuth }: DashboardArgs) {
	const [name, setName] = useState("");
	useEffect(() => {
		getName();
	}, [name]);
	async function getName() {
		try {
			const response = await fetch("http://localhost:8080/dashboard", {
				method: "GET",
				headers: { token: localStorage.token },
			});
			const parseRes = await response.json();
			setName(parseRes.user_name);
		} catch (err: any) {
			console.error(err.message);
		}
	}

	const handleLogout = () => {
		localStorage.removeItem("token");
		setAuth(false);
	};
	return (
		<div>
			<h1>dashboard of {name}</h1>
			<button onClick={handleLogout}>Log out</button>
		</div>
	);
}
