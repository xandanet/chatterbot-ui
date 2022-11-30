import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {BarChart, PieChart, LineChart, Line, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Cell, Bar, Legend} from 'recharts';
import {Col, Row} from 'antd';
import moment from 'moment';
import _ from 'lodash';

import {humanizer} from 'humanize-duration';

import {podcasts} from '../../data/podcasts';
import usePodcastInterventions from '../../hooks/usePodcastsInterventions';
import usePodcastsPlays from '../../hooks/usePodcastsPlays';
import useSegmentPopularities from '../../hooks/usePodcastsSegmentPopularity';
import usePodcast from '../../hooks/usePodcast';
import useBookmarks from '../../hooks/useBookmarks';

export default function Episode() {
	const [searchTerm, setSearchTerm] = useState('');

	let {episodeId} = useParams();
	const [interventions, interventionsQuery] = usePodcastInterventions({episodeId});
	const [plays, playsQuery] = usePodcastsPlays({episodeId});
	const [popularities, popularitiesQuery] = useSegmentPopularities({episodeId});
	const [podcast, podcastQuery] = usePodcast({episodeId});
	const [bookmarksList, bookmarksQuery] = useBookmarks({podcastId: episodeId});
	const filteredPodcasts = podcasts.filter((podcast) => {
		const title = podcast.title.toLowerCase();
		return title.includes(searchTerm.toLowerCase());
	});

	const getPodcastPlaysData = () => {
		let data = [];
		if (plays) {
			plays.forEach((element, index) => {
				data.push({
					name: moment(element.date).format('dddd'),
					Plays: element.count,
				});
			});
		}

		return data;
	};

	const getSegmentPopularitiesData = () => {
		let data = [];
		if (popularities) {
			popularities.forEach((element, index) => {
				data.push({
					name: '',
					Plays: element.plays,
				});
			});
		}

		return data;
	};

	const getInterventionsDurationData = () => {
		let data = [];
		if (interventions) {
			interventions.forEach((element, index) => {
				data.push({
					name: `Speaker ${index} - ${humanizer({delimiter: ' and ', round: true})(element.time_spoken)}`,
					value: element.time_spoken,
				});
			});
		}

		return data;
	};

	const getSpeakerPopularityData = () => {
		let data = [];
		if (interventions) {
			interventions.forEach((element, index) => {
				data.push({
					name: `Speaker ${index + 1}`,
					value: element.plays,
				});
			});
		}

		return data;
	};

	const getBookmarksData = () => {
		let data = [];
		if (bookmarksList) {
			const bookmarksGrouped = _.groupBy(bookmarksList, (bookmark) => bookmark.position);
			_.forEach(bookmarksGrouped, (element, index) => {
				data.push({
					name: humanizer({delimiter: ' and ', round: true})(index),
					Time: index,
					Count: element.length,
				});
			});
		}
		return data;
	};

	const RADIAN = Math.PI / 180;
	const getInterventionsDurationLabels = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		const timeSpokenMillisecs = interventions[index].time_spoken;

		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{humanizer({delimiter: ' and ', round: true})(timeSpokenMillisecs)}
			</text>
		);
	};

	const chartColours = [
		'#C6A49A',
		'#98c491',
		'#f47f12',
		'#f4ad23',
		'#E94E77',
		'#ffc22f',
		'#009384',
		'#e0e0cf',
		'#77934d',
		'#bfcda7',
		'#eb8b36',
		'#fdeca2',
	];

	return (
		<div className="centering">
			{podcast?.title && <h1 className="my-8">Episode Analytics: {podcast.title}</h1>}
			<Row style={{marginBottom: 50}}>
				<Col>
					<h2 className="text-xl mb-4">Daily Episode Plays</h2>
					<LineChart
						width={750}
						height={500}
						data={getPodcastPlaysData()}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" label="" />
						<YAxis label={{value: 'Plays', offset: 0, angle: -90, position: 'insideLeft'}} />
						<Tooltip />
						<Line dataKey="Plays" fill="#8884d8" />
					</LineChart>
				</Col>
			</Row>

			<Row style={{marginBottom: 50}} gutter={100}>
				<Col>
					<h2 className="text-xl">Speaker Duration</h2>
					<p className="text-slate-600 mb-4">Total amount of time spoken by each speaker</p>
					<PieChart width={800} height={500}>
						<Pie
							dataKey="value"
							isAnimationActive={false}
							data={getInterventionsDurationData()}
							fill="#8884d8"
							labelLine={false}
							label="">
							{getInterventionsDurationData().map((entry, index) => (
								<Cell key={`cell-${index}`} fill={chartColours[index % chartColours.length]} />
							))}
						</Pie>
						<Legend verticalAlign="top" align="left" layout="vertical" />
						<Tooltip />
					</PieChart>
				</Col>
				<Col>
					<h2 className="text-xl mb-4">Speaker Popularity</h2>
					<p className="text-slate-600 mb-4">Total number of listens to each speaker's segments</p>
					<BarChart
						width={750}
						height={500}
						data={getSpeakerPopularityData()}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" label="" />
						<YAxis label={{value: 'Plays', offset: 0, angle: -90, position: 'insideLeft'}} />
						<Tooltip />
						<Bar dataKey="value" fill="#8884d8">
							{getSpeakerPopularityData().map((entry, index) => (
								<Cell key={`cell-${index}`} fill={chartColours[index % chartColours.length]} />
							))}
						</Bar>
					</BarChart>
				</Col>
			</Row>

			<Row style={{marginBottom: 50}}>
				<Col>
					<h2 className="text-xl mb-4">Segment Popularity</h2>
					<p className="text-slate-600 mb-4">Total number of plays for each segment of the episode</p>
					<BarChart
						width={750}
						height={500}
						data={getSegmentPopularitiesData()}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" label="" />
						<YAxis label={{value: 'Plays', offset: 0, angle: -90, position: 'insideLeft'}} />
						<Tooltip />
						<Bar dataKey="Plays" fill="#8884d8" />
					</BarChart>
				</Col>
			</Row>

			<Row style={{marginBottom: 50}}>
				<Col>
					<h2 className="text-xl mb-4">Bookmark Popularity</h2>
					<p className="text-slate-600 mb-4">Total number of bookmarks against a speicif point within the episode</p>
					<BarChart
						width={750}
						height={500}
						data={getBookmarksData()}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis label={{value: 'Count', offset: 0, angle: -90, position: 'insideLeft'}} />
						<Tooltip />
						<Bar dataKey="Count" fill="#8884d8" />
					</BarChart>
				</Col>
			</Row>
		</div>
	);
}
