import { useEffect, useState } from "react";

const useFetch = (url: string) => {
	const [data, setData] = useState<any>([]);
	const [error, setError] = useState<string>('');
	const [pending, setPending] = useState<boolean>(false);

	useEffect(() => {
		setData([]);
		setError('');
		setPending(true);
		fetch(url)
			.then(res => {
				if (!res.ok) {
					throw new Error('Error fetching countries data.');
				}
				res.json()
			})
			.then(data => {
				setData(data);
				setPending(false);
			})
			.catch(err => {
				setData([]);
				setPending(false);
				setError(err.message);
			});
	}, [url]);	

	return {data, error, pending};
}

export default useFetch;