import {useEffect, useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import {
	IoPlaySkipBackCircleOutline,
	IoPlaySkipForwardCircleOutline,
	IoPauseCircleOutline,
	IoPlayCircleOutline,
	IoBookmarkSharp,
} from 'react-icons/io5';

import {MdOutlineTextsms} from 'react-icons/md';

import Button from './Button';
import {podcasts} from '../data/podcasts';
import Duration from './player/Duration';
import IconButton from './player/IconButton';
import Subtitles from './player/Subtitles';

export default function PodcastPlayer(podcast) {
	const [playerOptions, setPlayerOptions] = useState({
		loading: false,
		canPlay: false,
		url: [podcasts[0].audioSrc],
		pip: false,
		playing: false,
		controls: false,
		light: false,
		volume: 0.8,
		muted: false,
		played: 0,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
		loop: false,
		file: {
			forceAudio: true,
		},
	});
	const [audioOptions, setAudioOptions] = useState({
		loading: false,
		canPlay: false,
		subtitlesOpen: false,
	});
	const playerRef = useRef();
	const {playing, duration, played} = playerOptions;
	const {loading, canPlay, subtitlesOpen} = audioOptions;

	const load = (url) => {
		console.log('url', url);
		console.log('canPlay', ReactPlayer.canPlay(url));
		setPlayerOptions((prev) => ({
			...prev,
			url,
			played: 0,
			loaded: 0,
			pip: false,
		}));
	};

	const handlePlayPause = () => {
		setPlayerOptions((prev) => ({...prev, playing: !playerOptions.playing}));
	};

	const handleStop = () => {
		setPlayerOptions((prev) => ({...prev, url: null, playing: false}));
	};

	const handlePlay = () => {
		console.log('onPlay');
		setPlayerOptions((prev) => ({...prev, playing: true}));
	};

	const handlePause = () => {
		console.log('onPause');
		setPlayerOptions((prev) => ({...prev, playing: false}));
	};

	const handleSeekMouseDown = (e) => {
		setPlayerOptions((prev) => ({...prev, seeking: true}));
	};

	const handleSeekChange = (e) => {
		setPlayerOptions((prev) => ({...prev, played: parseFloat(e.target.value)}));
	};

	const handleSeekMouseUp = (e) => {
		setPlayerOptions((prev) => ({...prev, seeking: false}));
		playerRef.current.seekTo(parseFloat(e.target.value));
	};

	const handleProgress = (state) => {
		console.log('onProgress', state);
		// We only want to update time slider if we are not currently seeking
		if (!playerOptions.seeking) {
			setPlayerOptions((prev) => ({...prev, ...state}));
		}
	};

	const handleEnded = () => {
		console.log('onEnded');
		setPlayerOptions((prev) => ({...prev, playing: playerOptions.loop}));
	};

	const handleDuration = (duration) => {
		console.log('onDuration', duration);
		setPlayerOptions((prev) => ({...prev, duration}));
	};

	const toggleSubtitles = () => {
		setAudioOptions((prev) => ({...prev, subtitlesOpen: !audioOptions.subtitlesOpen}));
	};

	return (
		<>
			<div className="absolute w-0 h-0 overflow-hidden">
				<ReactPlayer
					ref={playerRef}
					{...playerOptions}
					onReady={() => {
						console.log('onReady');
						setAudioOptions((prev) => ({
							...prev,
							canPlay: true,
						}));
					}}
					onStart={() => console.log('onStart')}
					onPlay={handlePlay}
					onPause={handlePause}
					onBuffer={() => {
						console.log('onBuffer');
						setAudioOptions((prev) => ({
							...prev,
							loading: true,
						}));
					}}
					onBufferEnd={() => {
						console.log('onBufferEnd');
						setAudioOptions((prev) => ({
							...prev,
							loading: false,
						}));
					}}
					onSeek={(e) => console.log('onSeek', e)}
					onEnded={handleEnded}
					onError={(e) => {
						console.log('onError', e);
						setAudioOptions((prev) => ({
							...prev,
							canPlay: false,
						}));
					}}
					onProgress={handleProgress}
					onDuration={handleDuration}
				/>
			</div>

			{JSON.stringify(playerOptions, null, 4)}
			<br />

			<div className="fixed bottom-4 left-4 right-4 flex items-center bg-slate-200 shadow-xl rounded p-2 z-20">
				<div className="mr-4">
					<IconButton large disabled={!canPlay} onClick={() => handlePlayPause()}>
						{!playing ? <IoPlayCircleOutline className="text-4xl" /> : <IoPauseCircleOutline className="text-4xl" />}
					</IconButton>
				</div>
				<div className="mr-4">{loading ? 'Loading...' : <span>No podcast selected.</span>}</div>
				<div className="w-[300px] ml-auto mr-4">
					<input
						type="range"
						min={0}
						max={0.999999}
						step="any"
						value={played}
						onMouseDown={handleSeekMouseDown}
						onChange={handleSeekChange}
						onMouseUp={handleSeekMouseUp}
						disabled={!canPlay}
					/>
				</div>
				<div className="mr-2">
					<Duration seconds={duration * played} /> / <Duration seconds={duration} />
				</div>
				<div>
					<IconButton disabled={!canPlay} onClick={() => alert('Bookmark!')}>
						<IoBookmarkSharp className="text-2xl" />
					</IconButton>
				</div>
				<div>
					<IconButton disabled={!canPlay} onClick={toggleSubtitles}>
						<MdOutlineTextsms className="text-2xl" />
					</IconButton>
				</div>
			</div>
			<Subtitles open={subtitlesOpen} />
			<Button
				onClick={() => {
					load(podcasts[0].audioSrc);
					handlePlay();
				}}>
				Load MP3
			</Button>
			<Button
				onClick={() => {
					load(podcasts[0].audioSrc);
					const seekValue = 13;
					playerRef.current.seekTo(parseFloat(seekValue, 'seconds'));
				}}>
				Seek to timestamp
			</Button>
		</>
	);
}
