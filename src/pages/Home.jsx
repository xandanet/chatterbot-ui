import _ from 'lodash';
import usePodcasts from '../hooks/usePodcasts';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {Spin} from 'antd';
import SearchResults from '../components/SearchResults';
import {usePlayerContext} from '../context/usePlayerContext';
import {podcasts} from '../data/podcasts';
import {IoPlayCircleOutline} from 'react-icons/io5';

export default function Home() {
	const [podcastData, podcastQuery] = usePodcasts();
	const {playerRef, playerOptions, setPlayerOptions, setActivePodcast} = usePlayerContext();

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
					const seekTo = _.random(0, 100, true);
					return (
						<div key={podcast.id} className="mx-8 my-4 p-6 text-left bg-slate-50 rounded shadow">
							<div className="text-xs uppercase font-bold text-slate-500">
								Season {podcast.season} Episode {podcast.episode}
							</div>
							<h2 className="text-lg text-medium">{podcast.title}</h2>
							<div className="mt-2">
								<Button
									onClick={() => {
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
									<span className="flex">
										<IoPlayCircleOutline className="text-xl mr-2" />
										<span>Play</span>
									</span>
								</Button>{' '}
								{podcast.id === 11 && (
									<Button
										onClick={async () => {
											setActivePodcast(podcast);
											setPlayerOptions((prev) => ({
												...prev,
												url: `/podcasts/${podcast.filename.replace('.wav', '_pt.mp3')}`,
												playing: true,
												played: 0,
												loaded: 0,
												pip: false,
											}));
										}}>
										<span className="flex">
											<IoPlayCircleOutline className="text-xl mr-2" />
											<span>Play (Portugese)</span>
										</span>
									</Button>
								)}
							</div>
						</div>
					);
				})}
			</SearchResults>
		</div>
	);
}
