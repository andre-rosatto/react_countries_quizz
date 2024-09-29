import { ICountry } from "../typings/types";

interface GuessListProps {
	guesses: Array<string>;
	country: ICountry
}

export default function GuessList({guesses, country}: GuessListProps) {
	return (
		<ul className="flex flex-col gap-1 items-center m-auto w-full max-w-sm">
			{guesses.map(guess =>
				<li key={guess} className="text-gray-200 w-full px-2 border border-gray-200 flex items-center justify-center uppercase">
					{guess}

					{/* wrong guess */}
					{guess.toLowerCase() !== country.name.toLowerCase() && <svg className="size-5 ml-2 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>}

					{/* right guess */}
					{guess.toLowerCase() === country.name.toLowerCase() && <svg className="size-5 ml-2 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
					</svg>}
				</li>
			)}
		</ul>
	);
}