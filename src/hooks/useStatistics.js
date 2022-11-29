import {useQuery} from 'react-query';

const fetchStatistics = async ({queryKey}) => {
    const { episodeId } = queryKey?.[1];
    const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/plays/statistics?id=' + episodeId || '')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export default function useStatistics({episodeId}) {
    const query = useQuery(
        ['episodeId', {episodeId}],
        fetchStatistics,
        {
            enabled: !!episodeId
        }
    )
	return [query?.data?.data, query];
}