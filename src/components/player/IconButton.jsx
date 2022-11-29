export default function IconButton({children, size, large = false, ...props}) {
	return (
		<button type="button" className={`${!!props.large ? 'p-1' : 'p-2'} hover:bg-slate-300 hover:text-indigo-500 rounded`} {...props}>
			{children}
		</button>
	);
}
