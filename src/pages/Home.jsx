import _ from 'lodash';
import usePodcasts from '../hooks/usePodcasts';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {Spin} from 'antd';
import SearchResults from '../components/SearchResults';
import {usePlayerContext} from '../context/usePlayerContext';
import {podcasts} from '../data/podcasts';

export default function Home() {
	const [podcastData, podcastQuery] = usePodcasts();
	const {playerRef, playerOptions, setPlayerOptions, setActivePodcast} = usePlayerContext();
	console.log('playerOptions', playerOptions);

	return (
		<div>
			<h1 className="my-8">Podcasts</h1>

			{podcastQuery.isLoading && (
				<div className="my-12">
					<Spin />
				</div>
			)}

			<SearchResults>
				{podcastData?.map((podcast) => {
					console.log;
					const seekTo = _.random(0, 100, true);
					return (
						<div key={podcast.id} className="p-8 text-left">
							<div className="text-xs uppercase font-bold text-slate-500">
								Season {podcast.season} Episode {podcast.episode}
							</div>
							<h2 className="text-lg text-medium">{podcast.title}</h2>
							<div className="mt-4">
								<Button
									onClick={() => {
										console.log('Audio 1');
										setActivePodcast(podcast);
										setPlayerOptions((prev) => ({
											...prev,
											url: `/podcasts/${podcast.filename.replace('.wav', '.mp3')}`,
											playing: true,
											played: 0,
											loaded: 0,
											pip: false,
										}));
									}}>
									Play Podcast
								</Button>
							</div>
						</div>
					);
				})}
			</SearchResults>
		</div>
	);
}
