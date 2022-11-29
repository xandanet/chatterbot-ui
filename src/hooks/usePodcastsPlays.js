import {useQuery} from 'react-query';

const fetchPlays = async ({queryKey}) => {
    const { episodeId } = queryKey?.[1];
    const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/plays/per-day?podcast_id=' + episodeId || '')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export default function usePlays({episodeId}) {
    const query = useQuery(
        ['plays-per-day', {episodeId}],
        fetchPlays,
        {
            enabled: !!episodeId
        }
    )
	return [query?.data?.data, query];
}