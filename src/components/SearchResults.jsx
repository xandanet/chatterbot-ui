import {Spin} from 'antd';

export default function SearchResults({children, totalCount, loading}) {
	if (loading) {
		return (
			<div className="my-12">
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div>
			{typeof totalCount === 'number' && <div className="text-right text-sm px-4 py-3">Showing {totalCount} Results</div>}
			<div className="grid grid-cols-1 divide-y">{children}</div>
		</div>
	);
}
