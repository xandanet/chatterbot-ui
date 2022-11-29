import {useQuery} from 'react-query';

const fetchSegmentPopularities = async ({queryKey}) => {
    const { episodeId } = queryKey?.[1];
    const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/plays/segment-popularity?podcast_id=' + episodeId || '')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export default function useSegmentPopularities({episodeId}) {
    const query = useQuery(
        ['segmentPopularities', {episodeId}],
        fetchSegmentPopularities,
        {
            enabled: !!episodeId
        }
    )
	return [query?.data?.data, query];
}