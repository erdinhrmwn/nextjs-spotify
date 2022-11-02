import { ArrowLeftOnRectangleIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

const Sidebar = () => {
	const spotifyApi = useSpotify();
	const { data: session } = useSession();
	const [playlists, setPlaylists] = useState([]);
	const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

	useEffect(() => {
		spotifyApi.getUserPlaylists().then((data) => {
			setPlaylists(data.body.items);
		});
	}, [session, spotifyApi]);

	return (
		<nav className='text-gray-400 p-5 text-sm border-r border-gray-900 overflow-y-scroll w-72 h-screen sm:max-w-[12rem] lg:max-w-[15rem]'>
			<div className='space-y-4'>
				<button className='flex items-center space-x-2 hover:text-white'>
					<HomeIcon className='h-5 w-5' />
					<p>Home</p>
				</button>
				<button className='flex items-center space-x-2 hover:text-white'>
					<MagnifyingGlassIcon className='h-5 w-5' />
					<p>Search</p>
				</button>
				<button className='flex items-center space-x-2 hover:text-white'>
					<Square3Stack3DIcon className='h-5 w-5' />
					<p>Library</p>
				</button>
				<hr className='border-t-[0.1px] border-gray-900' />

				<button className='flex items-center space-x-2 hover:text-white'>
					<PlusCircleIcon className='h-5 w-5' />
					<p>Create Playlist</p>
				</button>
				<button className='flex items-center space-x-2 hover:text-white'>
					<HeartIcon className='h-5 w-5' />
					<p>Liked Songs</p>
				</button>
				<hr className='border-t-[0.1px] border-gray-900' />

				{playlists.map((playlist) => (
					<p className='cursor-pointer hover:text-white truncate' key={playlist.id} onClick={() => setPlaylistId(playlist.id)}>
						{playlist.name}
					</p>
				))}
			</div>
		</nav>
	);
};

export default Sidebar;
