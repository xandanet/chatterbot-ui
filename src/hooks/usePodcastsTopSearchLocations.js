import {useQuery} from 'react-query';

const fetchPodcastsSearchLocations = async () => {
    const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/searches/locations')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json() 
}

export default function usePodcastsTopSearchLocations() {
    const query = useQuery('searchLocations', fetchPodcastsSearchLocations)
	  return [query?.data?.data, query];
}