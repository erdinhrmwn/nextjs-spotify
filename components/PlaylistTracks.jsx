import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import Song from "./Song";

const PlaylistTracks = ({ playlistId }) => {
	const spotifyApi = useSpotify();
	const [tracks, setTracks] = useState([]);

	useEffect(() => {
		const loadPlaylistTracks = async () => {
			const data = await spotifyApi.getPlaylistTracks(playlistId);
			setTracks(data.body.items);
		};

		loadPlaylistTracks();
	}, [playlistId]);

	return (
		<div className='p-5'>
			{tracks.map((track, i) => {
				const song = track.track;
				return <Song key={song.id} order={i} track={song} />;
			})}
		</div>
	);
};

export default PlaylistTracks;
