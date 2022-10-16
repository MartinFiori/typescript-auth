import { useEffect, useState, useRef } from "react";

type TimerArgs = {
	milisegundos: number;
};

export default function Timer({ milisegundos }: TimerArgs) {
	const [segundos, setSegundos] = useState(0);
	const ref = useRef<NodeJS.Timeout>();
	useEffect(() => {
		ref.current && clearInterval(ref.current);
		ref.current = setInterval(
			() => setSegundos(prev => prev + 1),
			milisegundos
		);
	}, [milisegundos]);
	return (
		<>
			<h4>
				Timer: <small>{segundos}</small>
			</h4>
		</>
	);
}
