import {useState} from 'react';

import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import SearchResults from '../components/SearchResults';
import SearchResultItem from '../components/SearchResultItem';

import {podcasts} from '../data/podcasts';
import usePodcasts from '../hooks/usePodcasts';
import useSearch from '../hooks/useSearch';

export default function Search() {
	const [searchTerm, setSearchTerm] = useState('');
	// const [podcastData, podcastQuery] = usePodcasts();
	// console.log('podcastData', podcastData);

	const [searchData, searchQuery] = useSearch({
		searchTerm,
	});
	const searchResults = searchData?.SubtitleDTO || [];
	console.log('searchQuery', searchQuery);

	const filteredPodcasts = podcasts.filter((podcast) => {
		const title = podcast.title.toLowerCase();
		return title.includes(searchTerm.toLowerCase());
	});

	return (
		<div>
			<h1 className="my-8">Search</h1>
			{/* <div className="my-8">
				<p>You are searching for podcasts containing the keyword:</p>
			</div> */}
			<TextInput onChange={(e) => setSearchTerm(e.target.value)} loading={searchQuery.isLoading} />
			{/* <Button>Search</Button> */}
			{searchTerm && searchResults && (
				<SearchResults loading={searchQuery.isLoading} totalCount={searchResults.length}>
					<div className="grid grid-cols-1 divide-y bg-slate-50">
						{searchResults.map((result) => (
							<SearchResultItem key={result.ID} {...result} />
						))}
					</div>
				</SearchResults>
			)}
		</div>
	);
}
