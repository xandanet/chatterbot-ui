import _ from 'lodash';
import {useQueryClient} from 'react-query';

import {MdSentimentNeutral, MdSentimentVerySatisfied, MdSentimentVeryDissatisfied} from 'react-icons/md';
import {IoPlayCircleOutline} from 'react-icons/io5';
import {usePlayerContext} from '../context/usePlayerContext';
import Button from './Button';

import humanizeDuration from 'humanize-duration';

export default function SearchResultItem({searchTerm, ...result}) {
	const {playerRef, playerOptions, setPlayerOptions, setActivePodcast} = usePlayerContext();

	const queryClient = useQueryClient();
	const allPodcasts = queryClient.getQueryData('podcasts')?.data || [];
	const podcast = allPodcasts.find((podcast) => podcast.id === result.PodcastID);

	const startInSecs = humanizeDuration(result.Start, {units: ['s']}).replace(' seconds', '');

	return (
		<div key={result.ID} className="flex items-center p-8 text-left bg-slate-50 rounded">
			<div className="">
				<span className="text-sm font-medium">
					Season {podcast?.season || '00'} Episode {podcast?.episode || '000'}
				</span>

				<h2 className="text-xl font-medium text-indigo-500 flex">{result?.Podcast || 'Podcast title'}</h2>

				<div className="flex mt-1 items-center">
					<span className="text-xs text-slate-500">
						{humanizeDuration(result?.Start, {round: true})} &mdash; {humanizeDuration(result?.End, {round: true})}
					</span>
					<span className="ml-2 text-lg">
						{result.Sentiment === 'Positive' ? (
							<MdSentimentVerySatisfied className="text-green-500" />
						) : result.Sentiment === 'Negative' ? (
							<MdSentimentVeryDissatisfied className="text-red-500" />
						) : (
							<MdSentimentNeutral className="text-yellow-500" />
						)}
					</span>
				</div>

				<div className="text-xs mt-1 mb-4">
					<p dangerouslySetInnerHTML={{__html: result.Content.replace(searchTerm, `<mark>${searchTerm}</mark>`)}} />
				</div>

				<Button
					onClick={async () => {
						setActivePodcast(podcast);
						setPlayerOptions((prev) => ({
							...prev,
							url: `/podcasts/${podcast.filename.replace('.wav', '.mp3')}`,
							playing: true,
							played: 0,
							loaded: 0,
							pip: false,
						}));
						setTimeout(() => {
							playerRef.current.seekTo(parseFloat(startInSecs), 'seconds');
						}, 1000);
					}}>
					Listen
				</Button>
			</div>
		</div>
	);
}
