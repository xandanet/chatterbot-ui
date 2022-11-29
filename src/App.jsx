import React, {useState} from 'react';
import {createBrowserRouter, RouterProvider, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Search from './pages/Search';

import './App.scss';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},

			{
				path: 'search',
				element: <Search />,
			},
		],
	},
]);

function App() {
	const [queryClient] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 1000 * 10,
				},
			},
		})
	);

	return (
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</React.StrictMode>
	);
}

export default App;
