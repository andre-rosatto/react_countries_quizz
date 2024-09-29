import { FormEvent, useEffect, useState } from "react";
import { ICountry, isAPIDataList } from "./typings/types.d";
import Tips from "./components/Tips";
import EndGame from "./components/EndGame";
import GuessList from "./components/GuessList";
import Input from "./components/Input";
import TitleBar from "./components/TitleBar";
import Confetti from "./components/Confetti";

const MAX_GUESSES = 5;

function App() {
	const [error, setError] = useState<null | string>(null);
	const [countries, setCountries] = useState<Array<ICountry>>([]);
	const [countryIdx, setCountryIdx] = useState<number>(-1);
	const [guesses, setGuesses] = useState<Array<string>>([]);
	const [guess, setGuess] = useState<string>('');
	const [turn, setTurn] = useState<number>(0);

	const remainingCountries = countries.filter(country => !guesses.includes(country.name));

	useEffect(() => {
		setError(null);
		fetch('https://restcountries.com/v3.1/independent')
			.then(res => {
				if (!res.ok) {
					throw new Error('Error fetching countries data.');
				}
				return res.json()
			})
			.then(data => {
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
							region: item.subregion,
							googleMaps: item.maps.googleMaps
						}
					}));
					setCountryIdx(Math.floor(Math.random() * data.length));
				}
			})
			.catch(err => {
				setError(err.message);
			});
	}, []);

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
		if (countries.length === 0) return '';
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
			{!error && countryIdx === -1 && <p className="text-gray-200 text-center">Loading...</p>}

			{/* main section */}
			{countryIdx >=0 && <main className="text-gray-200 flex flex-col items-center px-2 max-w-md m-auto">

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
				
				{getWinStatus() === 'win' && <Confetti
					count={50}
					colors={['red', 'blue', 'cyan', 'green', 'yellow', 'white', 'pink', 'orange', 'purple']}
				/>}
			</main>}
			{/* main section end */}

    </>
		// app end
  );
}

export default App;
