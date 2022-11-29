import {useQuery} from 'react-query';

const fetchEpisode = async ({queryKey}) => {
    const { episodeId } = queryKey?.[1];
    const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/podcasts/' + episodeId || '')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export default function usePodcast({episodeId}) {
    const query = useQuery(
        ['podcast', {episodeId}],
        fetchEpisode,
        {
            enabled: !!episodeId
        }
    )
	return [query?.data?.data, query];
}