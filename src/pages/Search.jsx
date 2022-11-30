import {useState} from 'react';
import _ from 'lodash';

import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import SearchResults from '../components/SearchResults';
import SearchResultItem from '../components/SearchResultItem';

import {podcasts} from '../data/podcasts';
import usePodcasts from '../hooks/usePodcasts';
import useSearch from '../hooks/useSearch';
import {usePlayerContext} from '../context/usePlayerContext';

export default function Search() {
	const [searchTerm, setSearchTerm] = useState('');

	usePodcasts();
	const [searchData, searchQuery] = useSearch({
		searchTerm,
	});
	const searchResults = searchData?.SegmentDTO || [];

	return (
		<div>
			<h1 className="my-8">Search</h1>
			<TextInput
				onChange={_.debounce(function (e) {
					setSearchTerm(e.target.value);
				}, 500)}
				loading={searchQuery.isLoading}
			/>
			{/* <Button>Search</Button> */}
			{searchTerm && searchResults && (
				<SearchResults loading={searchQuery.isLoading} totalCount={searchResults.length || 0}>
					<div className="grid grid-cols-1 divide-y bg-slate-50">
						{searchResults.map((result) => (
							<SearchResultItem key={result.ID} {...result} searchTerm={searchTerm} />
						))}
						{!searchResults.length && (
							<div className="flex items-center p-8 justify-center">
								<span>
									Oops! Nothing found for your keywords, maybe this is something we can talk about in our next podcast!
								</span>
							</div>
						)}
					</div>
				</SearchResults>
			)}

			{!searchTerm && <p className="my-12">Enter a keyword above to start searching through our podcasts!</p>}
		</div>
	);
}
