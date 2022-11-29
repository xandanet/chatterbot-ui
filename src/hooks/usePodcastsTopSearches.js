import {useQuery} from 'react-query';

const fetchPodcastsTopSearches = async () => {
    const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/podcasts/top-searches')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json() 
}

export default function usePodcastsTopSearches() {
    const query = useQuery('topsearches', fetchPodcastsTopSearches)
	  return [query?.data?.data, query];
}