import {useQuery} from 'react-query';

const fetchPodcasts = async () => {
    const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/podcasts')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json() 
}

export default function usePodcasts() {
    const query = useQuery('podcasts', fetchPodcasts)
	return [query?.data?.data, query];
}