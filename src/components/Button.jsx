export default function Button({children, ...props}) {
	return (
		<button className="bg-indigo-600 text-white rounded py-2 px-4" {...props}>
			{children}
		</button>
	);
}
