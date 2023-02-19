import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import Logo from '../utils/tiktik-logo.png';
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';
import user from '../sanity-backend/schemas/user';

/*Navbar horizontal component with logo, search button and google login auth */
const Navbar = () => {
	const { userProfile, addUser, removeUser } = useAuthStore();
	const [searchValue, setSearchValue] = useState('');
	const router = useRouter();

	const handleSearch = (e: { preventDefault: ()=> void }) => {
		e.preventDefault();
		if(searchValue){
			router.push(`/search/${searchValue}`);
		}
	};

  	return (
		<div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
			<Link href="/">
				<div className='w-[100px] md:w-[130px]'>
					<Image
						className='cursor-pointer'
						src={Logo}
						alt='TikTok Clone'
						layout='responsive'
					/>
				</div>
			</Link>
			{/* Search component  */}
			<div className='relative hidden md:block'>
				<form
					onSubmit={handleSearch}
					className='absolute md:static top-10 -left-20 bg-white'
				>
					<input 
						type="text"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder="Search accounts and videos"
						className='p-3 font-medium md:text-md bg-primary border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] md:top-0 rounded-full'
					/>
					<button
						onClick={handleSearch}
						className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
					>
						<BiSearch />
					</button>
				</form>
			</div>
			{/* Upload and User Profile*/}
			<div>
				{userProfile? (
					<div className='flex items-center gap-6 md:gap-10'>
						<Link href="/upload">
							<button className='border-2 p-2 md:px-4 text-md font-semibold items-center flex gap-2 rounded-md'>
								<IoMdAdd className='text-xl'/>{' '}
								<span className='hidden md:block'>Upload</span>
							</button>
						</Link>
						{userProfile.image && (
							<Link href={`/profile/${userProfile._id}`}>
								<>
									<Image width={40} height={40} className="rounded-full cursor-pointer" src={userProfile.image} alt="profile pic" />
								</>
							</Link>
						)}
						<button type="button" className='border-2 p-2 rounded-full cursor-pointer outline-none shadow-md' onClick={() => {
								googleLogout();
								removeUser();
							}}>
							<AiOutlineLogout color="red" fontSize={21} />
						</button>
					</div>	
				):(
					<GoogleLogin 
						onSuccess={(response) => createOrGetUser(response, addUser)}
						onError={() => console.log('Error')}
					/>	
				)}
			</div>
		</div>
  	)
}
export default Navbar;