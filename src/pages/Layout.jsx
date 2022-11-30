import {useEffect, useRef, useState} from 'react';
import {Outlet} from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PodcastPlayer from '../components/PodcastPlayer';

import {podcasts} from '../data/podcasts';

export default function Layout({showPlayer}) {
	return (
		<div className="App">
			<Header />
			<div className="page-content">
				<Outlet />
			</div>
			<Footer />
			{showPlayer && <PodcastPlayer />}
		</div>
	);
}
