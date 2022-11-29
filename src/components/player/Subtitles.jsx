export default function Subtitles({children, open, ...props}) {
	return (
		<div
			className={`fixed bottom-14 left-8 right-8 rounded transition-all ${
				open ? 'opacity-100 visible' : 'opacity-0 invisible'
			} bg-slate-300 z-10`}
			{...props}>
			<div className="pb-12 pt-6">
				<h2 className="text-2xl font-medium mb-4">Subtitles</h2>

				<p>No subtitles found for this podcast.</p>
			</div>
		</div>
	);
}
