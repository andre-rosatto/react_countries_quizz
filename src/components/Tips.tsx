import { ICountry } from "../typings/types";

interface TipsProps {
	maxGuesses: number,
	country: ICountry,
	turn: number
}

export default function Tips({maxGuesses, country, turn}: TipsProps) {
	const getHearts = (): Array<JSX.Element> => {
		return Array.from(Array(maxGuesses - 1), (_, idx) => 
			maxGuesses - idx > turn + 1
				? <svg key={idx} className="size-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
						<path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
					</svg>
				: <svg key={idx} className="size-5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
					</svg>
		);
	}

	return (
		<div className="flex flex-row gap-4 py-4 justify-center">
			{/* flag */}
			<div className="w-28 h-28 sm:w-36 sm:h-36 p-2 flex flex-col justify-between sm:m-0 shadow-md shadow-black bg-gray-700 border border-white rounded-md">
				<img className="aspect-square max-h-20 sm:max-h-24 object-contain" src={country.flag} alt="flag" />
				<div className="flex bottom-0 left-0 w-full justify-center">{getHearts()}</div>
			</div>
			{/* flag end */}

			{/* info */}
			<div>
				<p className="font-bold">Population: <span className="font-normal">{ country.population.toString().replace(/\B(?<!\.\d)(?=(\d{3})+(?!\d))/g, ',') }</span></p>
				<p className="font-bold">Currency symbol: <span className="font-normal">{ country.currency }</span></p>
				<p className="font-bold">Traffic side: <span className="font-normal capitalize">{ country.trafficSide }</span></p>
				{turn > 0 && <p className="font-bold">Continent: <span className="font-normal">{ country.continents }</span></p>}
				{turn > 1 && <p className="font-bold">Region: <span className="font-normal">{ country.region }</span></p>}
				{turn > 2 && <p className="font-bold">Languages: <span className="font-normal">{ country.languages }</span></p>}
				{turn > 3 && <p className="font-bold">Capital: <span className="font-normal">{ country.capital }</span></p>}
			</div>
		</div>
	);
}