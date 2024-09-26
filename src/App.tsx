import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import { ICountry, isAPIDataList } from "./typings/types.d";

const MAX_GUESSES = 5;

function App() {
	const { data, error, pending } = useFetch('https://restcountries.com/v3.1/independent');
	const [countries, setCountries] = useState<Array<ICountry>>([]);
	const [countryIdx, setCountryIdx] = useState<number>(0);
	const [guesses, setGuesses] = useState<Array<string>>(['a', 'b', 'c', 'd', 'e']);

	useEffect(() => {
		if (isAPIDataList(data)) {
			setCountries(data.map(d => {
				return {
					name: d.name.common,
					flag: d.flags.svg,
					capital: d.capital,
					languages: Object.entries(d.languages).map(lang => lang[1]).join(', '),
					currency: Object.entries(d.currencies)[0][1].symbol,
					population: d.population,
					trafficSide: d.car.side,
					continents: d.continents.join(', '),
					googleMaps: d.maps.googleMaps
				}
			}));
			setCountryIdx(Math.floor(Math.random() * data.length));
		}
	}, [data]);

	const getHearts = (): Array<JSX.Element> => {
		return Array.from(Array(MAX_GUESSES - 1), (_, idx) => 
			MAX_GUESSES - idx > guesses.length + 1
				? <svg key={idx} className="size-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
						<path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
					</svg>
				: <svg key={idx} className="size-5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
					</svg>
		);
	}

	const getWinStatus = (): '' | 'win' | 'lose' => {
		if (guesses.at(-1) === countries[countryIdx].name) {
			return 'win';
		} else if (guesses.length >= MAX_GUESSES) {
			return 'lose';
		} else {
			return '';
		}
	}	

  return (
		// app
    <div>
			{error && <p className="text-red-500">error: { error }</p>}
			{pending && <p className="text-gray-200 text-center">Loading...</p>}

			{/* info window */}
			{!error && !pending && <div className="text-gray-200 flex flex-col items-center">
				<h2 className="text-2xl font-bold text-center inline-block">Who am I?</h2>
				<div className="p-4 flex flex-col max-w-2xl">
					{/* info container */}
					{countries.length > 0 && <div className="flex flex-row gap-4 p-2 sm:p-5">
						{/* flag */}
						<div className="w-28 h-28 sm:w-36 sm:h-36 p-2 flex flex-col justify-between sm:m-0 shadow-md shadow-black bg-gray-700 border border-white rounded-md">
							<img className="aspect-square max-h-20 sm:max-h-24 object-contain" src={countries[countryIdx].flag} alt="flag" />
							<div className="flex bottom-0 left-0 w-full justify-center">{getHearts()}</div>
						</div>
						{/* flag end */}

						{/* info */}
						<div>
							<p className="font-bold">Traffic side: <span className="font-normal capitalize">{ countries[countryIdx].trafficSide }</span></p>
							<p className="font-bold">Currency symbol: <span className="font-normal">{ countries[countryIdx].currency }</span></p>
							{guesses.length > MAX_GUESSES - 5 && <p className="font-bold ">Population: <span className="font-normal">{ countries[countryIdx].population.toString().replace(/\B(?<!\.\d)(?=(\d{3})+(?!\d))/g, ',') }</span></p>}
							{guesses.length > MAX_GUESSES - 4 && <p className="font-bold ">Continents: <span className="font-normal">{ countries[countryIdx].continents }</span></p>}
							{guesses.length > MAX_GUESSES - 3 && <p className="font-bold ">Languages: <span className="font-normal">{ countries[countryIdx].languages }</span></p>}
							{guesses.length > MAX_GUESSES - 2 && <p className="font-bold ">Capital: <span className="font-normal">{ countries[countryIdx].capital }</span></p>}
						</div>
					</div>}
					{/* info container end */}
					{countries.length > 0 && getWinStatus() && <a className="underline text-center sm:text-left flex justify-center" href={countries[countryIdx].googleMaps} target="_blank" rel="noreferrer">
						<svg className="size-6 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
						</svg>
						Show me on Google Maps
					</a>}
				</div>
			</div>}
			{/* info window end */}

			{/* guesses */}
			{countries.length > 0 && <div className="flex flex-col gap-1 items-center">
				{guesses.map(guess =>
					<p key={guess} className="text-gray-200 w-60 border border-gray-200 flex items-center justify-center">{guess}
						{/* wrong guess */}
						{guess !== countries[countryIdx].name && <svg className="size-5 ml-2 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>}
						{/* right guess */}
						{guess === countries[countryIdx].name && <svg className="size-5 ml-2 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
						</svg>}
					</p>
				)}
			</div>}
			{/* guesses end */}
    </div>
		// app end
  );
}

export default App;
