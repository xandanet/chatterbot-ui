import React from 'react';
import {Spin} from 'antd';
import {IoSearch} from 'react-icons/io5';

export default function TextInput({children, onChange, loading}) {
	return (
		<div className="relative block mx-auto mt-4 mb-8 max-w-[680px]">
			<input
				type="text"
				className="bg-white rounded py-2 px-4 w-full drop-shadow-lg pr-8"
				placeholder="Keywords..."
				onChange={onChange}
			/>
			{/* {loading && <Spin className="absolute right-10 top-3" size="14" />} */}
			<IoSearch className="absolute right-2 top-2 text-xl" />
		</div>
	);
}
