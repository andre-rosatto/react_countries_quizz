import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import { ICountry, isAPIDataList } from "./typings/types.d";

function App() {
	const { data, error, pending } = useFetch('https://restcountries.com/v3.1/independent');
	const [countries, setCountries] = useState<Array<ICountry>>([]);
	const [countryIdx, setCountryIdx] = useState<null | number>(null);

	useEffect(() => {
		if (isAPIDataList(data)) {
			setCountries(data.map(d => {
				return {
					name: d.name,
					flag: d.flags.svg,
					capital: d.capital,
					languages: Object.entries(d.languages).map(lang => lang[1]).join(', '),
					currency: Object.entries(d.currencies)[0][1].symbol,
					population: d.population,
					trafficSide: d.car.side
				}
			}));			
			setCountryIdx(Math.floor(Math.random() * data.length));
		}
	}, [data]);

  return (
		// app
    <div>
			{error && <p className="text-red-500">error: { error }</p>}
			{pending && <p className="text-gray-200 text-center">Loading...</p>}

			{/* info window */}
			{!error && !pending && <div>
				<div className="p-5 sm:rounded-md flex flex-col m-auto sm:max-w-lg text-gray-200">
					<h2 className="text-2xl font-bold text-center inline-block">Who am I?</h2>
					{/* info container */}
					{countries.length > 0 && countryIdx &&<div className="flex flex-col sm:flex-row gap-4 p-5">
						{/* flag */}
						<img className="w-36 mx-auto sm:m-0 object-contain shadow-sm shadow-black" src={countries[countryIdx].flag} alt="flag" />
						{/* info */}
						<div>
							<p className="font-bold text-center sm:text-left">Capital: <span className="font-normal">{ countries[countryIdx].capital }</span></p>
							<p className="font-bold text-center sm:text-left">Languages: <span className="font-normal">{ countries[countryIdx].languages }</span></p>
							<p className="font-bold text-center sm:text-left">Currency symbol: <span className="font-normal">{ countries[countryIdx].currency }</span></p>
							<p className="font-bold text-center sm:text-left">Population: <span className="font-normal">{ countries[countryIdx].population }</span></p>
							<p className="font-bold text-center sm:text-left">Traffic side: <span className="font-normal">{ countries[countryIdx].trafficSide }</span></p>
						</div>
					</div>}
					{/* info container end */}
				</div>
			</div>}
			{/* info window end */}
    </div>
		// app end
  );
}

export default App;
