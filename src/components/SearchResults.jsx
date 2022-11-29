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
			<div className="text-right text-sm px-4 py-3">Showing {totalCount || 0} Results</div>
			<div className="grid grid-cols-1 divide-y bg-slate-50">{children}</div>
		</div>
	);
}
