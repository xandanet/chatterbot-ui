import {useState} from 'react';
import {useParams} from 'react-router-dom'
import {BarChart, PieChart, LineChart, Line, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar} from 'recharts';
import {Col, Row} from 'antd';
import moment from 'moment';

import {humanizer} from 'humanize-duration'

import {podcasts} from '../../data/podcasts';
import usePodcastInterventions from '../../hooks/usePodcastsInterventions';
import usePodcastsPlays from '../../hooks/usePodcastsPlays';
import useSegmentPopularities from '../../hooks/usePodcastsSegmentPopularity';
import usePodcast from '../../hooks/usePodcast';

export default function Episode() {
  const [searchTerm, setSearchTerm] = useState('');

  let {episodeId} = useParams();
  const [interventions, interventionsQuery] = usePodcastInterventions({episodeId});
  const [plays, playsQuery] = usePodcastsPlays({episodeId});
  const [popularities, popularitiesQuery] = useSegmentPopularities({episodeId});
  const [podcast, podcastQuery] = usePodcast({episodeId});
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
          value: element.count
        })
      });
    }

    return data;
  }

  const getSegmentPopularitiesData = () => {
    let data = [];
    if (popularities) {
      popularities.forEach((element, index) => {
        data.push({
          name: "",
          value: element.plays
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
    <div className="centering">
      {podcast?.title &&
        <h1 className="my-8">Episode Analytics: {podcast.title}</h1>
      }
      <Row style={{marginBottom: 50}}>
        <Col>
          <h2 className="text-xl mb-4">Total Plays</h2>
          <LineChart
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
            <YAxis label={{ value: 'Plays', offset: 0, angle: -90, position: 'insideLeft' }} />
            <Tooltip/>
            <Line dataKey="value" fill="#8884d8"/>
          </LineChart>
        </Col>
      </Row>

      <Row style={{marginBottom: 50}}>
        <Col>
          <h2 className="text-xl">Speaker Durations</h2>
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
          <h2 className="text-xl mb-4">Speaker Popularity</h2>
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
            <YAxis label={{ value: 'Plays', offset: 0, angle: -90, position: 'insideLeft' }} />
            <Tooltip/>
            <Bar dataKey="value" fill="#8884d8"/>
          </BarChart>
        </Col>
      </Row>

      <Row style={{marginBottom: 50}}>
        <Col>
          <h2 className="text-xl mb-4">Segment Popularity</h2>
          <BarChart
            width={750}
            height={500}
            data={getSegmentPopularitiesData()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" label=""/>
            <YAxis label={{ value: 'Plays', offset: 0, angle: -90, position: 'insideLeft' }} />
            <Tooltip/>
            <Bar dataKey="value" fill="#8884d8"/>
          </BarChart>
        </Col>
      </Row>
    </div>
  );
}
