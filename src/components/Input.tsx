import { FormEvent } from "react";
import { ICountry } from "../typings/types";

interface InputProps {
	guess: string;
	countryList: Array<ICountry>;
	onGuessSubmit: (e: FormEvent<HTMLFormElement>) => void;
	setGuess: (value: string) => void
}

export default function Input ({guess, countryList, onGuessSubmit, setGuess}: InputProps) {
	return (
		<form className="flex max-w-full px-2 mt-2" onSubmit={onGuessSubmit}>
			<input
				className="rounded-md mr-2 w-full pl-2"
				type="text"
				list="countries"
				value={guess}
				onChange={e => setGuess(e.target.value)}
			/>
			<datalist id="countries">
				<option value=""></option>
				{countryList.map(country => <option value={country.name} key={country.name}>{country.name}</option>)}
			</datalist>
			<button
				className="disabled:bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed bg-green-600 rounded-md text-gray-200 px-4 py-2 font-bold uppercase cursor-pointer hover:bg-green-500 shadow-sm shadow-black active:bg-green-900 active:text-gray-400"
				disabled={guess === '' || countryList.filter(country => country.name.toLowerCase() === guess.toLowerCase()).length === 0 }
			>Guess</button>
		</form>
	);
}