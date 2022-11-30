import {message, Modal} from 'antd';
import {useEffect, useState} from 'react';
import {usePlayerContext} from '../../context/usePlayerContext';
import Button from '../Button';
import Duration from './Duration';

import {IoPauseCircleOutline, IoPlayCircleOutline} from 'react-icons/io5';
import useCreateBookmark from '../../hooks/useCreateBookmark';

export default function BookmarkModal({time, ...props}) {
	const {playerOptions, setPlayerOptions, activePodcast} = usePlayerContext();
	const [createBookmark] = useCreateBookmark();
	const [messageApi, contextHolder] = message.useMessage();
	const [note, setNote] = useState('');
	const [success, setSuccess] = useState(false);

	return (
		<Modal title="Bookmark" centered footer={null} {...props}>
			{contextHolder}
			<p className="mb-4 flex">
				<span className="mr-1">Time:</span>
				<Duration seconds={time} />
			</p>
			<p className="mb-4">
				<textarea
					className="bg-slate-100 w-full py-2 px-3"
					placeholder="Add comment..."
					onChange={(e) => setNote(e.target.value)}
				/>
			</p>

			<Button
				disabled={!note}
				onClick={() => {
					createBookmark(
						{
							id: activePodcast?.id,
							time: Math.round(time * 1000),
							note,
						},
						{
							onSuccess: () => {
								messageApi.open({
									type: 'success',
									content: 'Bookmark added!',
								});
								setNote('');
								props.onCancel();
							},
							onError: () => {
								messageApi.open({
									type: 'error',
									content: 'Bookmark error!',
								});
							},
						}
					);
				}}>
				Add Bookmark
			</Button>
		</Modal>
	);
}
