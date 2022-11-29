import _ from 'lodash';
import {MdSentimentNeutral, MdSentimentVerySatisfied, MdSentimentVeryDissatisfied} from 'react-icons/md';
import {IoPlayCircleOutline} from 'react-icons/io5';

export default function SearchResultItem(result, searchTerm) {
	return (
		<div key={result.ID} className="flex items-center p-8 text-left">
			<div className="">
				<span className="text-sm font-medium">
					Season {result?.season || '00'} Episode {result?.episode || '000'}
				</span>

				<h2 className="text-xl font-medium text-indigo-500 flex cursor-pointer">
					<IoPlayCircleOutline className="text-3xl text-indigo-500 hover:text-indigo-600 mr-1" />{' '}
					{result?.title || 'Podcast title'}
				</h2>

				<div className="flex mt-1 items-center">
					<span className="text-xs text-slate-500">Plays: 100 | 03:15 - 06:33</span>{' '}
					<span className="ml-2 text-lg">
						{
							_.shuffle([
								<MdSentimentNeutral className="text-yellow-500" />,
								<MdSentimentVerySatisfied className="text-green-500" />,
								<MdSentimentVeryDissatisfied className="text-red-500" />,
							])[0]
						}
					</span>
				</div>

				<div className="text-xs mt-1">
					<p dangerouslySetInnerHTML={{__html: result.Content.replace(/carbon/, '<mark>carbon</mark>')}} />
				</div>
			</div>
		</div>
	);
}
