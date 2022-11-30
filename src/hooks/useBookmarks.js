import {useQuery} from 'react-query';

const fetchBookmarks = async ({queryKey}) => {
    const { podcastId } = queryKey?.[1];
    const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/podcasts/bookmark?pod_id=' + podcastId || '')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export default function useBookmarks({podcastId}) {
    const query = useQuery(
        ['bookmarks', {podcastId}],
        fetchBookmarks,
        {
            enabled: !!podcastId
        }
    )
	return [query?.data?.data, query];
}