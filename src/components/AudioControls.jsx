import React from 'react';
import {IoPlaySkipBackCircleOutline, IoPlaySkipForwardCircleOutline, IoPauseCircleOutline, IoPlayCircleOutline} from 'react-icons/io5';

const AudioControls = ({isPlaying, onPlayPauseClick, onPrevClick, onNextClick}) => (
	<div className="m-3">
		{/* <button type="button" className="prev hover:text-indigo-500" aria-label="Previous" onClick={onPrevClick}>
			<IoPlaySkipBackCircleOutline className="text-2xl" />
		</button> */}
		{isPlaying ? (
			<button type="button" className="pause hover:text-indigo-500" onClick={() => onPlayPauseClick(false)} aria-label="Pause">
				<IoPauseCircleOutline className="text-3xl" />
			</button>
		) : (
			<button type="button" className="play hover:text-indigo-500" onClick={() => onPlayPauseClick(true)} aria-label="Play">
				<IoPlayCircleOutline className="text-3xl" />
			</button>
		)}
		{/* <button type="button" className="next hover:text-indigo-500" aria-label="Next" onClick={onNextClick}>
			<IoPlaySkipForwardCircleOutline className="text-2xl" />
		</button> */}
	</div>
);

export default AudioControls;
