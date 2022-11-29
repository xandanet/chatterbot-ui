import {useState} from 'react';
import SearchResults from '../../components/SearchResults'
import {Link} from 'react-router-dom'
import {BarChart, PieChart, LineChart, Line, Pie, Tooltip, CartesianGrid, XAxis, YAxis, Legend, Bar} from 'recharts';
import {Col, Row} from 'antd';
import moment from 'moment';

import {humanizer} from 'humanize-duration'

import usePodcasts from '../../hooks/usePodcasts';

export default function Episodes() {
  const [searchTerm, setSearchTerm] = useState('');

  const [podcasts, podcastsQuery] = usePodcasts();
  console.log(podcasts)

  return (
    <div>
      <h1 className="my-8">Episodes</h1>

      <SearchResults>
        {podcasts?.map((podcast) => {
            return (
              <div key={podcast.id} className="p-8 text-left">
                <div className="text-xs uppercase font-bold text-slate-500">
                  Season {podcast.season} Episode {podcast.episode}
                </div>
                <h2 className="text-lg text-medium"><Link to={`/analytics/episodes/${podcast.id}`}>{podcast.title}</Link></h2>
              </div>
            );
          })}
        </SearchResults>
    </div>
  );
}
