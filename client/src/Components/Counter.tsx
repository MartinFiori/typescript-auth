import { useState } from "react";

export default function Counter() {
	const [counter, setCounter] = useState(0);
	const incrementar = (number: number): void => {
		setCounter(counter + number);
	};
	return (
		<div>
			<h3>Counter: useState</h3>
			<span>Value: {counter}</span>
			<br />
			<button onClick={() => setCounter(0)}>Reset</button>
			<button onClick={() => incrementar(1)}>+1</button>
			<button onClick={() => incrementar(2)}>+2</button>
		</div>
	);
}
