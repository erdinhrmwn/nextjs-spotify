import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

const Home = () => {
	return (
		<div>
			<Head>
				<title>Spotify 2.0</title>
				<meta name='description' content='Spotify Clone created using NextJs' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='bg-black h-screen overflow-hidden'>
				<main className='flex'>
					<Sidebar />
					<Center />
				</main>
				<section className='sticky bottom-0'>
					<Player />
				</section>
			</div>
		</div>
	);
};

export default Home;

export async function getServerSideProps(context) {
	const session = await getSession(context);

	return {
		props: {
			session,
		},
	};
}
