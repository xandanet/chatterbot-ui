import React, {useState} from 'react';
import {Popover, Spin} from 'antd';

import {usePlayerContext} from '../../context/usePlayerContext';
import useSubtitles from '../../hooks/useSubtitles';
import {BsThreeDots} from 'react-icons/bs';

const colours = {
	SPEAKER_00: 'border-yellow-300',
	SPEAKER_01: 'border-lime-300',
	SPEAKER_02: 'border-green-300',
	SPEAKER_03: 'border-emerald-300',
	SPEAKER_04: 'border-teal-300',
	SPEAKER_05: 'border-cyan-300',
	SPEAKER_06: 'border-sky-300',
	SPEAKER_07: 'border-blue-300',
	SPEAKER_08: 'border-indigo-300',
	SPEAKER_09: 'border-violet-300',
	SPEAKER_10: 'border-purple-300',
	SPEAKER_11: 'border-fuschia-300',
	SPEAKER_12: 'border-pink-300',
};

const languages = [
	{
		key: 'EN',
		label: 'English',
	},
	{
		key: 'PT',
		label: 'Portugese',
	},
];

export default function Subtitles({children, open, ...props}) {
	const [language, setLanguage] = useState('EN');
	const {playerOptions, activePodcast} = usePlayerContext();
	const [subtitlesList, subtitlesQuery] = useSubtitles({
		podcastId: activePodcast.id,
	});

	const playedSeconds = Math.round(playerOptions.playedSeconds * 1000);
	const currentSubtitles = subtitlesList?.find((subtitle) => playedSeconds >= subtitle.Start && playedSeconds <= subtitle.End);
	const [languageOpen, setLanguageOpen] = useState(false);

	const hide = () => {
		setLanguageOpen(false);
	};

	const handleOpenChange = (newOpen) => {
		setLanguageOpen(newOpen);
	};

	const renderSubtitle = () => {
		if (subtitlesQuery.isLoading) {
			return <Spin />;
		}

		if (!currentSubtitles) {
			return '...';
		}

		return (
			<>
				<div className="font-bold text-xs uppercase text-slate-500 mb-1">{currentSubtitles.Speaker.replace('_', ' ')}</div>
				<p className="text-sm">{language === 'PT' ? currentSubtitles.ContentPT : currentSubtitles.Content}.</p>
			</>
		);
	};

	return (
		<div
			className={`fixed bottom-14 left-8 right-8 rounded shadow-xl transition-all bg-slate-300 border-t-8 ${
				open ? 'opacity-100 visible' : 'opacity-0 invisible'
			} ${colours[currentSubtitles?.Speaker] || 'bg-slate-300'} z-10`}
			{...props}>
			<div className="absolute top-0 right-0 text-xs p-2">
				<Popover
					content={
						<>
							{languages.map((lang) => (
								<li
									key={lang.key}
									className={`cursor-pointer ${
										language === lang.key ? 'font-bold text-indigo-500' : 'hover:text-indigo-500'
									}`}
									onClick={() => {
										setLanguage(lang.key);
										hide();
									}}>
									{lang.label}
								</li>
							))}
						</>
					}
					title="Select Langauge"
					trigger="click"
					placement="topRight"
					open={languageOpen}
					onOpenChange={handleOpenChange}>
					<button className="hover:text-indigo-500 hover:bg-slate-300 rounded p-1">
						<BsThreeDots />
					</button>
				</Popover>
			</div>
			<div className="pb-14 pt-6 px-8">{renderSubtitle()}</div>
		</div>
	);
}
