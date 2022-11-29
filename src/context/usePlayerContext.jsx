import React, {createContext, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {podcasts} from '../data/podcasts';
import useSubtitles from '../hooks/useSubtitles';

const PlayerContext = createContext({});

export const usePlayerContext = () => {
	const context = useContext(PlayerContext);
	if (context === undefined) {
		throw new Error('usePlayerContext must be used within a PlayerContextProvider');
	}

	return context;
};

function PlayerContextProvider({children}) {
	const playerRef = useRef();
	const [playerOptions, setPlayerOptions] = useState({
		url: [podcasts[0].audioSrc],
		pip: false,
		playing: true,
		controls: true,
		light: false,
		volume: 0.8,
		muted: false,
		played: 0,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
		loop: false,
	});
	const [podcastOptions, setPodcastOptions] = useState({
		loading: false,
		canPlay: false,
		showSubtitles: false,
	});
	const [activePodcast, setActivePodcast] = useState({});

	return (
		<PlayerContext.Provider
			value={useMemo(
				() => ({
					playerRef,
					playerOptions,
					setPlayerOptions,
					podcastOptions,
					setPodcastOptions,
					activePodcast,
					setActivePodcast,
				}),
				[playerRef, playerOptions, setPlayerOptions, podcastOptions, setPodcastOptions, activePodcast, setActivePodcast]
			)}>
			{children}
		</PlayerContext.Provider>
	);
}

export default PlayerContextProvider;
