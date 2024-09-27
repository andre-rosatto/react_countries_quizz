import { useEffect, useRef } from "react";

interface ConfettiProps {
	count: number;
	colors: Array<string>
}

interface IConfetti {
	x: number;
	y: number;
	w: number;
	h: number;
	r: number;
	color: string;
	speedY: number;
	speedX: number;
	speedR: number;
}
export default function Confetti({count, colors}: ConfettiProps) {
	const canvas = useRef<HTMLCanvasElement>(null);
	const confetti = useRef<Array<IConfetti>>(
		Array.from(Array(count), () => {
			return {
				x: Math.random() * window.innerWidth,
				y: Math.random() * -50,
				w: Math.random() * 10 + 8,
				h: Math.random() * 10 + 8,
				r: Math.random(),
				color: colors[Math.floor(Math.random() * colors.length)],
				speedY: Math.random() * 2 + 1,
				speedX: (Math.random() - 0.5) / 2,
				speedR: (Math.random() - 0.5) / 20
			}
		}
	));

	useEffect(() => {
		// confetti animation
		const updateConfetti = () => {
			if (!canvas.current || !isCanvas(canvas.current)) return;
			const ctx = canvas.current.getContext('2d');
			if (!ctx) return;

			ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

			confetti.current.forEach(c => {
				c.x += c.speedX;
				if (c.y > canvas.current!.height) {
					c.x = Math.random() * canvas.current!.width;
					c.y = Math.random() * -5;
					c.speedR = (Math.random() - 0.5) / 20;
				} else {
					c.y += c.speedY
					c.r += c.speedR;
				}
				ctx.fillStyle = c.color;
				ctx.save();
				ctx.translate(c.x, c.y);
				ctx.rotate(c.r);
				ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
				ctx.restore();
			});
			requestAnimationFrame(updateConfetti);
		}
		requestAnimationFrame(updateConfetti);

		// resize event
		const handleResize = () => {
			if (canvas.current) {
				canvas.current.width = window.innerWidth;
				canvas.current.height = window.innerHeight;
			}
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [canvas]);

	const isCanvas = (el: any): el is HTMLCanvasElement => 'getContext' in el;


	return (
		<canvas
			ref={canvas}
			className="absolute top-0 left-0 pointer-events-none box-border"
		></canvas>
	);
}