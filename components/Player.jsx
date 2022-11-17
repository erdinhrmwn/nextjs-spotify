import { PlayIcon, SpeakerWaveIcon as VolumeDownIcon } from "@heroicons/react/24/outline";
import {
	ArrowsRightLeftIcon,
	ArrowUturnLeftIcon,
	BackwardIcon,
	ForwardIcon,
	PauseIcon,
	SpeakerWaveIcon as VolumeUpIcon,
} from "@heroicons/react/24/solid";
import { clamp, debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect, useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

const Player = () => {
	const { data: session } = useSession();
	const songInfo = useSongInfo();
	const spotifyApi = useSpotify();
	const [volume, setVolume] = useState(50);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);

	const fetchCurrentSong = async () => {
		if (songInfo) return;

		const currentPlaying = await spotifyApi.getMyCurrentPlayingTrack();
		setCurrentTrackId(currentPlaying.body?.item.id);

		const currentPlaybackState = await spotifyApi.getMyCurrentPlaybackState();
		setIsPlaying(currentPlaybackState.body?.is_playing);
	};

	const handlePlayPause = async () => {
		const currentPlaybackState = await spotifyApi.getMyCurrentPlaybackState();
		if (currentPlaybackState.body?.is_playing) {
			await spotifyApi.pause();
			setIsPlaying(false);
		} else {
			await spotifyApi.play();
			setIsPlaying(true);
		}
	};

	const handleVolume = async (number = 0) => {
		if (volume == 0 || volume == 100) {
			return;
		}

		const totalVolume = clamp(volume + number, 0, 100);
		setVolume(totalVolume);
		debounceAdjustVolume(totalVolume);
	};

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !currentTrackId) {
			fetchCurrentSong();
		}
	}, [currentTrackIdState, spotifyApi, session]);

	const debounceAdjustVolume = useCallback(
		debounce((volume) => {
			spotifyApi.setVolume(totalVolume).catch((err) => console.log(err));
		}, 300),
		[]
	);

	return (
		<div className='h-24 bg-gradient-to-b from-black to-zinc-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
			{/* Left */}
			<div className='flex items-center space-x-4'>
				<img className='hidden md:inline w-10 h-10' src={songInfo?.album?.images?.[0]?.url} alt='Album Logo' />
				<div>
					<h3>{songInfo?.name}</h3>
					<p>{songInfo?.artists?.[0]?.name}</p>
				</div>
			</div>

			{/* Center */}
			<div>
				<ArrowsRightLeftIcon className='button' />
				<BackwardIcon className='button' />

				{isPlaying ? (
					<PauseIcon onClick={handlePlayPause} className='button w-10 h-10' />
				) : (
					<PlayIcon onClick={handlePlayPause} className='button w-10 h-10' />
				)}
				<ForwardIcon className='button' />
				<ArrowUturnLeftIcon className='button' />
			</div>

			{/* Right */}
			<div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
				<VolumeDownIcon className='button' onClick={() => handleVolume(-10)} />
				<input
					className='w-14 md:w-28'
					type='range'
					name='volume'
					min={0}
					max={100}
					onChange={(e) => handleVolume(Number(e.target.value))}
					value={volume}
				/>
				<VolumeUpIcon className='button' onClick={() => handleVolume(10)} />
			</div>
		</div>
	);
};

export default Player;
