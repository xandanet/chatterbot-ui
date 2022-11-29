export default function Button({children, onClick}) {
	return (
		<button className="bg-indigo-600 text-white rounded py-2 px-4" onClick={onClick}>
			{children}
		</button>
	);
}
