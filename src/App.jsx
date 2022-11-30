import React, {useState} from 'react';
import {createBrowserRouter, RouterProvider, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import PlayerContextProvider from './context/usePlayerContext';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Search from './pages/Search';

import AdminLayout from './pages/AdminLayout';
import AnalyticsEpisodes from './pages/Analytics/Episodes';
import AnalyticsEpisode from './pages/Analytics/Episode';
import AnalyticsSearch from './pages/Analytics/Search';

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
	{
		path: '/analytics',
		element: <AdminLayout />,
		children: [
			{
				path: 'episodes',
				element: <AnalyticsEpisodes />,
			},
			{
				path: 'episodes/:episodeId',
				element: <AnalyticsEpisode />,
			},
			{
				path: 'search',
				element: <AnalyticsSearch />,
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
				<PlayerContextProvider>
					<RouterProvider router={router} />
				</PlayerContextProvider>
			</QueryClientProvider>
		</React.StrictMode>
	);
}

export default App;
