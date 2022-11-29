import React, {useState, useEffect, useRef} from 'react';
import AudioControls from './AudioControls';

const AudioPlayer = ({tracks}) => {
	// State
	const [trackIndex, setTrackIndex] = useState(0);
	const [trackProgress, setTrackProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	// Destructure for conciseness
	const {title, season, episode, color, image, audioSrc} = tracks[trackIndex];

	// Refs
	const audioRef = useRef(new Audio(audioSrc));
	const intervalRef = useRef();
	const isReady = useRef(false);

	// Destructure for conciseness
	const {duration} = audioRef.current;

	const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
	const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

	const startTimer = () => {
		// Clear any timers already running
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (audioRef.current.ended) {
				toNextTrack();
			} else {
				setTrackProgress(audioRef.current.currentTime);
			}
		}, [1000]);
	};

	const onScrub = (value) => {
		// Clear any timers already running
		clearInterval(intervalRef.current);
		audioRef.current.currentTime = value;
		setTrackProgress(audioRef.current.currentTime);
	};

	const onScrubEnd = () => {
		// If not already playing, start
		if (!isPlaying) {
			setIsPlaying(true);
		}
		startTimer();
	};

	const toPrevTrack = () => {
		if (trackIndex - 1 < 0) {
			setTrackIndex(tracks.length - 1);
		} else {
			setTrackIndex(trackIndex - 1);
		}
	};

	const toNextTrack = () => {
		if (trackIndex < tracks.length - 1) {
			setTrackIndex(trackIndex + 1);
		} else {
			setTrackIndex(0);
		}
	};

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
			startTimer();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	// Handles cleanup and setup when changing tracks
	useEffect(() => {
		audioRef.current.pause();

		audioRef.current = new Audio(audioSrc);
		setTrackProgress(audioRef.current.currentTime);

		if (isReady.current) {
			audioRef.current.play();
			setIsPlaying(true);
			startTimer();
		} else {
			// Set the isReady ref as true for the next pass
			isReady.current = true;
		}
	}, [trackIndex]);

	useEffect(() => {
		// Pause and clean up on unmount
		return () => {
			audioRef.current.pause();
			clearInterval(intervalRef.current);
		};
	}, []);

	return (
		<div className="fixed bottom-6 left-6 right-6 bg-slate-200 text-left p-4 rounded shadow-xl flex items-center z-10">
			<div className="bg-slate-300 w-[60px] h-[60px] mr-6 rounded">
				<AudioControls isPlaying={isPlaying} onPrevClick={toPrevTrack} onNextClick={toNextTrack} onPlayPauseClick={setIsPlaying} />
			</div>
			<div className="track-info mr-6 flex-1">
				{image && <img className="artwork" src={image} alt={`track artwork for ${title}`} />}
				<span className="text-slate-600 text-sm font-medium">
					Season {season} Episode {episode}
				</span>
				<h2 className="font-medium" title={title}>
					{title}
				</h2>
			</div>
			<div className="w-1/3">
				<input
					type="range"
					value={trackProgress}
					step="1"
					min="0"
					max={duration ? duration : `${duration}`}
					className="progress w-full"
					onChange={(e) => onScrub(e.target.value)}
					onMouseUp={onScrubEnd}
					onKeyUp={onScrubEnd}
					style={{background: trackStyling}}
				/>
			</div>
		</div>
	);
};

export default AudioPlayer;
