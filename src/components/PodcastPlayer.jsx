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
import {usePlayerContext} from '../context/usePlayerContext';

export default function PodcastPlayer(podcast) {
	const {playerRef, podcastOptions, setPodcastOptions, playerOptions, setPlayerOptions, activePodcast} = usePlayerContext();
	const {playing, duration, played} = playerOptions;
	const {loading, canPlay, subtitlesOpen} = podcastOptions;

	console.log('activePodcast', activePodcast);

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
		setPlayerOptions((prev) => ({...prev, playing: false}));
	};

	const handleDuration = (duration) => {
		console.log('onDuration', duration);
		setPlayerOptions((prev) => ({...prev, duration}));
	};

	const toggleSubtitles = () => {
		setPodcastOptions((prev) => ({...prev, subtitlesOpen: !podcastOptions.subtitlesOpen}));
	};

	return (
		<>
			<div className="absolute w-0 h-0 overflow-hidden">
				<ReactPlayer
					ref={playerRef}
					{...playerOptions}
					onReady={() => {
						console.log('onReady');
						setPodcastOptions((prev) => ({
							...prev,
							canPlay: true,
						}));
					}}
					onStart={() => console.log('onStart')}
					onPlay={handlePlay}
					onPause={handlePause}
					onBuffer={() => {
						console.log('onBuffer');
						setPodcastOptions((prev) => ({
							...prev,
							loading: true,
						}));
					}}
					onBufferEnd={() => {
						console.log('onBufferEnd');
						setPodcastOptions((prev) => ({
							...prev,
							loading: false,
						}));
					}}
					onSeek={(e) => console.log('onSeek', e)}
					onEnded={handleEnded}
					onError={(e) => {
						console.log('onError', e);
						setPodcastOptions((prev) => ({
							...prev,
							canPlay: false,
						}));
					}}
					onProgress={handleProgress}
					onDuration={handleDuration}
				/>
			</div>

			<div className="fixed bottom-4 left-4 right-4 bg-slate-200 shadow-xl rounded z-20">
				<div className="flex items-center p-2">
					<div className="mr-2">
						<IconButton large disabled={!canPlay} onClick={() => handlePlayPause()}>
							{!playing ? <IoPlayCircleOutline className="text-4xl" /> : <IoPauseCircleOutline className="text-4xl" />}
						</IconButton>
					</div>
					<div className="mr-4 flex-1 text-left">
						{loading ? 'Loading...' : <span>{activePodcast ? activePodcast.title : 'No podcast selected.'}</span>}
					</div>
					<div className="ml-auto mr-2 text-xs">
						<Duration seconds={duration * played} /> / <Duration seconds={duration} />
					</div>
					<div>
						<IconButton disabled={!canPlay} onClick={() => alert('Bookmark!')}>
							<IoBookmarkSharp className="text-2xl" />
						</IconButton>
					</div>
					<div>
						<IconButton disabled={!activePodcast?.has_subtitles} onClick={toggleSubtitles}>
							<MdOutlineTextsms className="text-2xl" />
						</IconButton>
					</div>
				</div>
				<div className="-mt-4">
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
						className="m-0"
					/>
				</div>
			</div>

			<Subtitles open={activePodcast?.has_subtitles && subtitlesOpen} />
		</>
	);
}
