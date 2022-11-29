import {useQuery} from 'react-query';

const fetchInteventions = async ({queryKey}) => {
    const { episodeId } = queryKey?.[1];
    const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/podcasts/interventions?id=' + episodeId || '')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export default function useInterventions({episodeId}) {
    const query = useQuery(
        ['episodeId', {episodeId}],
        fetchInteventions,
        {
            enabled: !!episodeId
        }
    )
	return [query?.data?.data, query];
}