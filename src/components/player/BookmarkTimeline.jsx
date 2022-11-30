import React, {useState} from 'react';
import {Popover, Spin} from 'antd';

import {usePlayerContext} from '../../context/usePlayerContext';
import useBookmarks from '../../hooks/useBookmarks';
import {BsThreeDots} from 'react-icons/bs';

export default function Bookmarks({children, open, ...props}) {
	const {playerOptions, activePodcast} = usePlayerContext();
	const [bookmarksList, bookmarksQuery] = useBookmarks({
		podcastId: activePodcast.id,
	});

	const playedSeconds = Math.round(playerOptions.playedSeconds * 1000);
	// const currentSubtitles = subtitlesList?.find((subtitle) => playedSeconds >= subtitle.Start && playedSeconds <= subtitle.End);

	console.log('bookmarksList', bookmarksList);

	return <div></div>;
}
