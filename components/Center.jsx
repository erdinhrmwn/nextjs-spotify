import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import PlaylistInfo from "./PlaylistInfo";
import PlaylistTracks from "./PlaylistTracks";

const Center = () => {
	const { data: session } = useSession();

	const spotifyApi = useSpotify();
	const playlistId = useRecoilValue(playlistIdState);
	const [playlist, setPlaylist] = useRecoilState(playlistState);

	const loadPlaylist = async (playlistId) => {
		const data = await spotifyApi.getPlaylist(playlistId);
		setPlaylist(data.body);
	};

	useEffect(() => {
		loadPlaylist(playlistId);
	}, [spotifyApi, playlistId]);

	return (
		<div className='flex-grow overflow-y-scroll h-screen'>
			<header className='absolute top-5 right-8'>
				<div className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
					{session?.user.image ? (
						<img className='rounded-full w-10 h-10' src={session?.user?.image} alt='Profile pic' />
					) : (
						<UserCircleIcon className='w-10 h-10' />
					)}
					<h3 className='w-[100px] text-md truncate'>{session?.user?.name}</h3>
					<ChevronDownIcon className='w-5 h-5' />
				</div>
			</header>
			{playlist ? (
				<div>
					<PlaylistInfo playlist={playlist} />
					<PlaylistTracks playlistId={playlist.id} />
				</div>
			) : null}
		</div>
	);
};

export default Center;
