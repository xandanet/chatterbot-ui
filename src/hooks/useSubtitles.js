import {useQuery} from 'react-query';

const fetchSubtitles = async ({queryKey}) => {
    const { podcastId } = queryKey?.[1];
    const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/podcasts/subtitles?podcast_id=' + podcastId || '')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json() 
}

export default function useSubtitles({podcastId}) {
    console.log('podcastId', podcastId)
    const query = useQuery(
        ['subtitles', {podcastId}], 
        fetchSubtitles, 
        {
            enabled: !!podcastId
        }
    )
	return [query?.data?.data, query];
}