import { shuffle, unescape } from "lodash";
import { useEffect, useState } from "react";
const colors = ["from-indigo-500", "from-blue-500", "from-green-500", "from-red-500", "from-yellow-500", "from-pink-500", "from-purple-500"];

const PlaylistInfo = ({ playlist }) => {
	const [color, setColor] = useState(null);
	useEffect(() => {
		setColor(shuffle(colors).pop());
	}, [playlist]);

	return (
		<section className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 p-8 text-white`}>
			<img src={playlist?.images?.[0]?.url} alt='' className='h-52 w-52 shadow-2xl' />
			<div className='space-y-4'>
				<p className='text-sm'>PLAYLIST</p>
				<h1 className='text-3xl md:text-4xl xl:text-5xl font-bold'>{playlist.name}</h1>
				<p className='text-gray-400'>{unescape(playlist.description)}</p>
			</div>
		</section>
	);
};

export default PlaylistInfo;
