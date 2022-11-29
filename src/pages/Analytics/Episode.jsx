import {useState} from 'react';
import { useParams } from 'react-router-dom'
import { BarChart, PieChart, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar } from 'recharts';

import { humanizer } from 'humanize-duration'

import {podcasts} from '../../data/podcasts';
import usePodcastInterventions from '../../hooks/usePodcastsInterventions.js';

export default function Episode() {
	const [searchTerm, setSearchTerm] = useState('');

	let { episodeId } = useParams();
	const [interventions, interventionsQuery] = usePodcastInterventions({episodeId});

	const filteredPodcasts = podcasts.filter((podcast) => {
		const title = podcast.title.toLowerCase();
		return title.includes(searchTerm.toLowerCase());
	});

	const getInterventionsDurationData = () => {
		let data = [];
		if(interventions) {
			interventions.forEach((element, index) => {
				data.push({
					name: `Speaker ${index + 1}`,
					value: element.time_spoken
				})
			});
		}

		return data;
	}
	const getSpeakerPopularityData = () => {
		console.log(interventions, interventionsQuery);
		let data = [];
		if(interventions) {
			interventions.forEach((element, index) => {
				data.push({
					name: `Speaker ${index + 1}`,
					value: element.plays
				})
			});
		}

		return data;
	}

	const RADIAN = Math.PI / 180;
	const getInterventionsDurationLabels = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		const timeSpokenMillisecs = interventions[index].time_spoken

		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{humanizer({ delimiter: " and ", round: true})(timeSpokenMillisecs)}
			</text>
		);
	};

	console.log(getSpeakerPopularityData())

	return (
		<div>
			<h1 className="my-8">Episode Analytics</h1>

        <PieChart width={500} height={500}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={getInterventionsDurationData()}
            // outerRadius={250}
            fill="#8884d8"
						labelLine={false}
            label={getInterventionsDurationLabels}
          />
          <Tooltip />
        </PieChart>

			<BarChart
          width={750}
          height={500}
          data={getSpeakerPopularityData()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"  label="Speaker" />
          <YAxis  label="Plays"/>
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>

		</div>
	);
}
