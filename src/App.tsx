import { FormEvent, useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import { ICountry, isAPIDataList } from "./typings/types.d";
import Tips from "./components/Tips";
import EndGame from "./components/EndGame";
import GuessList from "./components/GuessList";
import Input from "./components/Input";
import TitleBar from "./components/TitleBar";
import Confetti from "./components/Confetti";

const MAX_GUESSES = 5;

function App() {
	const { data, error, pending } = useFetch('https://restcountries.com/v3.1/independent');
	const [countries, setCountries] = useState<Array<ICountry>>([]);
	const [countryIdx, setCountryIdx] = useState<number>(0);
	const [guesses, setGuesses] = useState<Array<string>>([]);
	const [guess, setGuess] = useState<string>('');
	const [turn, setTurn] = useState<number>(0);

	const remainingCountries = countries.filter(country => !guesses.includes(country.name));

	useEffect(() => {
		if (isAPIDataList(data)) {
			const sorted = [...data].sort((a, b) => a.name.common < b.name.common ? -1 : 0);
			setCountries(sorted.map(item => {
				return {
					name: item.name.common,
					flag: item.flags.svg,
					capital: item.capital,
					languages: Object.entries(item.languages).map(lang => lang[1]).join(', '),
					currency: Object.entries(item.currencies)[0][1].symbol,
					population: item.population,
					trafficSide: item.car.side,
					continents: item.continents.join(', '),
					googleMaps: item.maps.googleMaps
				}
			}));
			setCountryIdx(Math.floor(Math.random() * data.length));
		}
	}, [data]);

	const handleGuessSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setGuesses([...guesses, guess]);
		if (guess.toLowerCase() !== countries[countryIdx].name.toLowerCase()) {
			setTurn(turn + 1);
		}
		setGuess('');
	}

	const handleRestartClick = () => {
		setGuesses([]);
		setGuess('');
		setCountryIdx(Math.floor(Math.random() * countries.length));
		setTurn(0);
	}

	const getWinStatus = (): '' | 'win' | 'lose' => {
		if (guesses.at(-1)?.toLowerCase() === countries[countryIdx].name.toLocaleLowerCase()) {
			return 'win';
		} else if (turn >= MAX_GUESSES) {
			return 'lose';
		} else {
			return '';
		}
	}	

  return (
		// app
    <>
			{/* error and fetching messages */}
			{error && <p className="text-red-500">error: { error }</p>}
			{pending && <p className="text-gray-200 text-center">Loading...</p>}

			{/* main section */}
			{!error && !pending && <main className="text-gray-200 flex flex-col items-center px-2 max-w-md m-auto">

				{/* title bar*/}
				<TitleBar onRestartClick={handleRestartClick} />

				{/* info container */}
				{countries.length > 0 && <div className="flex flex-col w-full max-w-md">
					<Tips maxGuesses={MAX_GUESSES} country={countries[countryIdx]} turn={turn} />
					{getWinStatus() && <EndGame country={countries[countryIdx]} />}
				</div>}

				{/* guesses container */}
				{countries.length > 0 && <GuessList guesses={guesses} country={countries[countryIdx]} />}

				{/* input */}
				{countries.length > 0 && !getWinStatus() && <Input guess={guess} countryList={remainingCountries} onGuessSubmit={handleGuessSubmit} setGuess={setGuess} />}
			</main>}
			{/* main section end */}

			{getWinStatus() === 'win' && <Confetti
				count={50}
				colors={['red', 'blue', 'cyan', 'green', 'yellow', 'white', 'pink', 'orange', 'purple']}
			/>}
    </>
		// app end
  );
}

export default App;
