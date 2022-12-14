import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {Col, Row, Table} from 'antd';
import usePodcastsTopSearchLocations from '../../hooks/usePodcastsTopSearchLocations';
import usePodcastsTopSearches from '../../hooks/usePodcastsTopSearches.js';
import usePodcastsTopSearchesNoResults from "../../hooks/usePodcastsTopSearchesNoResults";

export default function Search() {
	const [searchTerm, setSearchTerm] = useState('');

	const [topSearches, topSearchesQuery] = usePodcastsTopSearches();
	const [topSearchesNoResults, topSearchesNoResultsQuery] = usePodcastsTopSearchesNoResults();
	const [topSearchLocations, topSearchLocationsQuery] = usePodcastsTopSearchLocations();

	const searchLocationColumns = [
		{
			title: 'Location',
			dataIndex: 'location',
			key: 'location',
		},
		{
			title: 'Searches',
			dataIndex: 'searches',
			key: 'searches',
		},
	];

	const searchLocationData = () => {
		let data = [];
		if (topSearchLocations) {
			topSearchLocations.forEach((element, index) => {
				data.push({
					key: index,
					location: element.country,
					searches: element.searches,
				});
			});
		}

		return data;
	};

	const searchColumns = [
		{
			title: 'Keywords',
			dataIndex: 'keywords',
			key: 'keywords',
		},
		{
			title: 'Searches',
			dataIndex: 'searches',
			key: 'searches',
		},
	];

	const searchData = () => {
		let data = [];
		if (topSearches) {
			topSearches.forEach((element, index) => {
				data.push({
					key: index,
					searches: element.total,
					keywords: element.keyword,
				});
			});
		}

		return data;
	};

	const noResultsSearchColumns = [
		{
			title: 'Keywords',
			dataIndex: 'keywords',
			key: 'keywords',
		},
		{
			title: 'Searches',
			dataIndex: 'searches',
			key: 'searches',
		},
	];

	const noResultsSearchData = () => {
		let data = [];
		if (topSearchesNoResults) {
			topSearchesNoResults.forEach((element, index) => {
				data.push({
					key: index,
					searches: element.total,
					keywords: element.keyword,
				});
			});
		}

		return data;
	};

	return (
		<div className="centering">
			<h1 className="my-8">Search Analytics</h1>

			<Row gutter={20}>
				<Col span={8}>
					<h2 className="text-xl mb-4">Top Searches</h2>
					<Table dataSource={searchData()} columns={searchColumns} />
				</Col>
				<Col span={8}>
					<h2 className="text-xl mb-4">Top Search With No Results</h2>
					<Table dataSource={noResultsSearchData()} columns={noResultsSearchColumns} />
				</Col>
        <Col span={8}>
          <h2 className="text-xl mb-4">Popular Search Locations</h2>
          <Table dataSource={searchLocationData()} columns={searchLocationColumns} />
        </Col>
			</Row>
		</div>
	);
}
