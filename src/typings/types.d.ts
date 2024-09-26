export interface ICountryData {
	name: string;
	capital: string;
	languages: Array<string>;
	currency: string;
	population: number;
	trafficSide: string;
}

export const isCountryData = (data: any): data is ICountryData => {
	return (
		'name' in data &&
		'capital' in data &&
		'languages' in data &&
		'currencies' in data &&
		'population' in data &&
		'car' in data
	);
}

export const isCountryDataList = (data: any): data is Array<ICountryData> => {
	return Array.isArray(data) && data.length && isCountryData(data[0]);
}
