import { useState } from 'react';

const App: React.FC = () => {
	const [ input, setInput ] = useState('');
	// code is the transpiled output from esbuild.
	const [ code, setCode ] = useState('');

	const onClick = () => {
		console.log(input);
	};

	return (
		<div>
			<textarea value={input} onChange={(e) => setInput(e.target.value)} />
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<pre>{code}</pre>
		</div>
	);
};

export default App;
