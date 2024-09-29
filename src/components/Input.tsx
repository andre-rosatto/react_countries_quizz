import { FormEvent } from "react";
import { ICountry } from "../typings/types";

interface InputProps {
	guess: string;
	countryList: Array<ICountry>;
	onGuessSubmit: (e: FormEvent<HTMLFormElement>) => void;
	setGuess: (value: string) => void
}

export default function Input ({guess, countryList, onGuessSubmit, setGuess}: InputProps) {
	const handleSuggestionClick = (countryName: string) => {
		setGuess(countryName);
	}	

	return (
		<form className="flex flex-col w-full mt-4 gap-4" onSubmit={onGuessSubmit}>
			<div className="flex">
				<input
					className="rounded-md mr-2 w-full pl-2 text-gray-900"
					type="text"
					value={guess}
					onChange={e => setGuess(e.target.value)}
				/>
				<button
					className="disabled:bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed bg-green-600 rounded-md text-gray-200 px-4 py-2 font-bold uppercase cursor-pointer hover:bg-green-500 shadow-sm shadow-black active:bg-green-900 active:text-gray-400"
					disabled={guess === '' || countryList.filter(country => country.name.toLowerCase() === guess.toLowerCase()).length === 0 }
				>Guess</button>
			</div>
			<ul className="flex flex-wrap gap-2">
				{countryList.filter(country => country.name.toLowerCase().includes(guess.toLowerCase())).map(country =>
					<li
						key={country.name}
						className="px-2 border border-gray-200 rounded-full cursor-pointer hover:bg-green-900"
						onClick={() => handleSuggestionClick(country.name)}
					>{country.name}</li>
				)}
			</ul>
		</form>
	);
}