import {useEffect, useRef, useState} from 'react';
import {Outlet} from 'react-router-dom';

import Header from '../components/Header';
import PodcastPlayer from '../components/PodcastPlayer';

import {podcasts} from '../data/podcasts';

export default function Layout() {
	return (
		<div className="App">
			<Header />
			<div className="page-content">
				<Outlet />
			</div>
			<PodcastPlayer />
		</div>
	);
}
