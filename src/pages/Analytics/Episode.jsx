import {useState} from 'react';
import {useParams} from 'react-router-dom'
import {BarChart, PieChart, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar} from 'recharts';
import {Col, Row} from 'antd';

import {humanizer} from 'humanize-duration'

import {podcasts} from '../../data/podcasts';
import usePodcastInterventions from '../../hooks/usePodcastsInterventions';
import usePodcastsPlays from '../../hooks/usePodcastsPlays';

export default function Episode() {
  const [searchTerm, setSearchTerm] = useState('');

  let {episodeId} = useParams();
  const [interventions, interventionsQuery] = usePodcastInterventions({episodeId});
  const [plays, playsQuery] = usePodcastsPlays({episodeId});
  console.log('plays', plays)

  const filteredPodcasts = podcasts.filter((podcast) => {
    const title = podcast.title.toLowerCase();
    return title.includes(searchTerm.toLowerCase());
  });

  const getPodcastPlaysData = () => {
    let data = [];
    if (plays) {
      plays.forEach((element, index) => {
        data.push({
          name: element.date,
          value: element.count
        })
      });
    }

    return data;
  }

  const getInterventionsDurationData = () => {
    let data = [];
    if (interventions) {
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
    let data = [];
    if (interventions) {
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
  const getInterventionsDurationLabels = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const timeSpokenMillisecs = interventions[index].time_spoken

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {humanizer({delimiter: " and ", round: true})(timeSpokenMillisecs)}
      </text>
    );
  };

  return (
    <div>
      <h1 className="my-8">Episode Analytics</h1>

      <Row>
        <Col>
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
            <Tooltip/>
          </PieChart>
        </Col>
        <Col>
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
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" label=""/>
            <YAxis label="Plays"/>
            <Tooltip/>
            <Bar dataKey="value" fill="#8884d8"/>
          </BarChart>
        </Col>
      </Row>
			<Row>
				<Col>
      <BarChart
        width={750}
        height={500}
        data={getPodcastPlaysData()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" label=""/>
        <YAxis label="Plays"/>
        <Tooltip/>
        <Bar dataKey="value" fill="#8884d8"/>
      </BarChart>
				</Col>
			</Row>
    </div>
  );
}
