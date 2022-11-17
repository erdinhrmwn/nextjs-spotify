import { useRecoilState } from "recoil";
import { millisToMinutesAndSeconds } from "../lib/time";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";

const Song = ({ track, order }) => {
	const spotifyApi = useSpotify();
	const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

	const playSong = () => {
		setCurrentTrackId(track.id);
		setIsPlaying(true);

		spotifyApi.play({
			uris: [track.uri],
		});
	};

	return (
		<div className='grid grid-cols-2 text-[#b3b3b3] py-2 px-5 hover:bg-gray-900 rounded-lg cursor-pointer' onClick={playSong}>
			<div className='flex items-center space-x-5'>
				<p className='w-5 text-center'>{order + 1}</p>
				<img className='w-14 h-14' src={track.album.images[0].url} alt='Album Image' />
				<div>
					<p className='w-36 lg:w-64 truncate text-white'>{track.name}</p>
					<p className='w-40'>{track.artists[0].name}</p>
				</div>
			</div>

			<div className='flex items-center justify-between ml-auto md:ml-0 mr-5'>
				<p className='w-40 truncate hidden md:inline'>{track.album.name}</p>
				<p className=''>{millisToMinutesAndSeconds(track.duration_ms)}</p>
			</div>
		</div>
	);
};

export default Song;
