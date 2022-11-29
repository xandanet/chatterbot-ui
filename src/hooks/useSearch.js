import {useQuery} from 'react-query';

const fetchSearch = async ({queryKey}) => {
    const { searchTerm } = queryKey?.[1];
    const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/podcasts/search?text=' + searchTerm || '')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json() 
}

export default function useSearch({searchTerm}) {
    const query = useQuery(
        ['search', {searchTerm}], 
        fetchSearch, 
        {
            enabled: !!searchTerm
        }
    )
	return [query?.data?.data, query];
}