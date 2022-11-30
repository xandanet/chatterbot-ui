import { useMutation } from 'react-query';

export default function useCreateBookmark() {
	const mutation = useMutation(
		async (params) => {
			const response = await fetch('https://api.chatterbot.hostings.co.uk/v1/podcasts/bookmark?pod_id=' + params.pod_id, {
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...params
				})
			})
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json() 
		}
	);

	return [mutation.mutate, mutation];
};
