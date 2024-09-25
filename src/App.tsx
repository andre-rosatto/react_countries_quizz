function App() {
  return (
		// app
    <div>
			{/* title */}
			<h1 className='text-3xl font-bold text-center py-5 text-gray-200'>Countries Quiz</h1>
			{/* info window */}
			<div className="p-5 bg-gray-400 sm:rounded-md flex flex-col m-auto shadow-md sm:max-w-lg">
				{/* info title */}
				<h2 className="text-2xl text-gray-900 font-bold text-center inline-block">What country is this?</h2>
				{/* info container */}
				<div className="flex flex-col sm:flex-row gap-4 p-5">
					{/* flag */}
					<img className="max-h-36" src="https://placehold.co/200x150" alt="flag" />
					{/* info */}
					<div>
						<p className="font-bold text-center sm:text-left">Capital: <span className="font-normal">St. George's</span></p>
						<p className="font-bold text-center sm:text-left">Languages: <span className="font-normal">English</span></p>
						<p className="font-bold text-center sm:text-left">Currency symbol: <span className="font-normal">$</span></p>
						<p className="font-bold text-center sm:text-left">Population: <span className="font-normal">112,519</span></p>
						<p className="font-bold text-center sm:text-left">Traffic side: <span className="font-normal">left</span></p>
					</div>
				</div>
			</div>
    </div>
  );
}

export default App;
