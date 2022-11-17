import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

const useSongInfo = () => {
	const spotifyApi = useSpotify();
	const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
	const [songInfo, setSongInfo] = useState(null);

	useEffect(() => {
		const fetchSongInfo = async () => {
			if (currentTrackId) {
				const trackInfo = await spotifyApi.getTrack(currentTrackId);
				setSongInfo(trackInfo.body);
			}
		};

		fetchSongInfo();
	}, [currentTrackId, spotifyApi]);

	return songInfo;
};

export default useSongInfo;
