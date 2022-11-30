import {useQuery} from 'react-query';

const fetchPodcastsTopSearchesNoResults = async () => {
    const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/podcasts/top-searches-no-result')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export default function usePodcastsTopSearchesNoResults() {
    const query = useQuery('topsearchesNoResults', fetchPodcastsTopSearchesNoResults)
	  return [query?.data?.data, query];
}
