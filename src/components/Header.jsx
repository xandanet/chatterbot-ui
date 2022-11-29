import {Link} from 'react-router-dom';

export default function Header() {
	return (
		<header className="flex items-center p-4 mb-4 w-full">
			<div>
				<Link to="/">
					<img src="Project-Chatter-Logo-Rev-2-2022-2.webp" alt="Project Chatter Logo" className="block w-[68px] m-auto" />
				</Link>
			</div>
			<div className="ml-auto">
				<Link to="/" className="ml-2">
					Home
				</Link>
				<Link to="/search" className="ml-2">
					Search
				</Link>
			</div>
		</header>
	);
}
