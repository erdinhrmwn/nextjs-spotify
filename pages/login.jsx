import { getProviders, signIn } from "next-auth/react";

import logoWithText from "../assets/images/logo_with_text.svg";
import logoWithoutText from "../assets/images/logo_without_text.svg";
import Image from "next/image";
import Head from "next/head";

const Login = ({ providers }) => {
	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
				<Image width={500} src={logoWithText} alt='Spotify Logo' />
				{Object.values(providers).map((provider) => (
					<div key={provider.name}>
						<button
							className='bg-[#18D860] text-white p-5 rounded-full'
							onClick={() =>
								signIn(provider.id, {
									callbackUrl: "/",
								})
							}>
							Login with {provider.name}
						</button>
					</div>
				))}
			</div>
		</>
	);
};

export default Login;

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}
