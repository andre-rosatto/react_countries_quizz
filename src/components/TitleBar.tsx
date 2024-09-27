interface TitleBarProps {
	onRestartClick: () => void
}

export default function TitleBar({onRestartClick}: TitleBarProps) {
	return (
		<div className="flex gap-10 items-center mt-2 sm:mt-5 w-full justify-center relative max-w-sm">
			<h1 className="text-2xl font-bold text-center">Who am I?</h1>
			<button
				className="size-8 bg-red-700 rounded-md px-1 cursor-pointer hover:bg-red-600 absolute right-0 active:bg-red-900"
				onClick={onRestartClick}
			>
				<svg viewBox="0 0 24 24" fill="currentColor">
					<path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
				</svg>
			</button>
		</div>
	);
}