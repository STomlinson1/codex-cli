import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugins';

const App: React.FC = () => {
	const ref = useRef<any>(null);
	const [ input, setInput ] = useState('');
	// code is the transpiled output from esbuild.
	const [ code, setCode ] = useState('');

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: '/esbuild.wasm'
		});
	};

	useEffect(() => {
		startService();
	}, []);

	const onClick = async () => {
		if (!ref.current) {
			return;
		}

		const result = await ref.current.build({
			entryPoints: [ 'index.js' ],
			bundle: true,
			write: false,
			plugins: [ unpkgPathPlugin() ]
		});

		console.log(result);

		setCode(result.code);
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
