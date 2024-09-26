export interface ICountry {
	name: string;
	flag: string;
	capital: string;
	languages: string
	currency: string;
	population: number;
	trafficSide: string;
	continents: string;
	googleMaps: string;
}

export interface IAPIData {
	name: {
		common: string;
	};
	capital: string;
	languages: {
		keys: string
	};
	currencies: {
		key: {
			symbol: string
		}
	};
	population: number;
	car: {
		side: string;
	};
	flags: {
		svg: string;
	};
	continents: Array<string>;
	maps: {
		googleMaps: string;
	}
}

export const isAPIData = (data: any): data is IAPIData => {
	return (
		'name' in data
		&& 'capital' in data
		&& 'languages' in data
		&& 'currencies' in data
		&& 'population' in data
		&& 'car' in data
		&& 'flags' in data
		&& 'continents' in data
		&& 'maps' in data
	);
}

export const isAPIDataList = (data: any): data is Array<IAPIData> => {
	return Array.isArray(data) && data.length > 0 && isAPIData(data[0]);
}
