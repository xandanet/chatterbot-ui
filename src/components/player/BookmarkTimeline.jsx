import React, {useState} from 'react';
import _ from 'lodash';
import {BarChart, PieChart, LineChart, Line, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Cell, Bar, Legend} from 'recharts';

import {usePlayerContext} from '../../context/usePlayerContext';
import useBookmarks from '../../hooks/useBookmarks';
import {BsThreeDots} from 'react-icons/bs';

export default function BookmarksTimeline({children, open, ...props}) {
	const {playerOptions, activePodcast} = usePlayerContext();
	const [bookmarksList, bookmarksQuery] = useBookmarks({
		podcastId: activePodcast.id,
	});

	const playedSeconds = Math.round(playerOptions.playedSeconds * 1000);
	// const currentSubtitles = subtitlesList?.find((subtitle) => playedSeconds >= subtitle.Start && playedSeconds <= subtitle.End);

	const getBookmarksData = () => {
		let data = [];
		if (bookmarksList) {
			const bookmarksGrouped = _.groupBy(bookmarksList, (bookmark) => bookmark.position);
			console.log('getBookmarksData', bookmarksGrouped);
			data.push({
				name: '',
				Time: 0,
				Count: 0,
			});
			_.forEach(bookmarksGrouped, (element, index) => {
				data.push({
					name: '',
					Time: index / 1000,
					Count: element.length,
				});
			});
			data.push({
				name: '',
				Time: Math.round(playerOptions.duration),
				Count: 0,
			});
		}
		return data;
	};

	return <div></div>;
}
