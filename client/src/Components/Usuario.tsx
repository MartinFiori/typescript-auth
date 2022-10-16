import { useState } from "react";

interface User {
	uid: String;
	name: String;
}

const TemporaryUser: User = {
	uid: "abc",
	name: "fsdfsd",
};

export default function Usuario() {
	const [user, setUser] = useState<User>();
	const login = () => {
		setUser(TemporaryUser);
	};
	return (
		<div>
			<h3>Usuario:useState</h3>
			<button onClick={login}>Login</button>
			{!user ? (
				<pre>Usuario no registrado</pre>
			) : (
				<pre>{JSON.stringify(user, undefined, 2)}</pre>
			)}
		</div>
	);
}
