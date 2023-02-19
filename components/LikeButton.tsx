import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../store/authStore';

interface IProps{
	likes: any[];
	handleLike: () => void;
	handleDisLike: () => void;
}

const LikeButton = ({ likes, handleLike, handleDisLike }:IProps) => {
	const [alreadyLiked, setAlreadyLiked] = useState(false);
	const { userProfile }: any = useAuthStore();

	//We get all the likes and then filter to keep only those from our user
	const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

	useEffect(() => {
		if(filterLikes?.length>0){
			setAlreadyLiked(true);
		} else {
			setAlreadyLiked(false);
		}
	},[filterLikes,likes]);

	return (
		<div className='flex gap-6'>
			<div className='mt-4 flex flex-col items-center justify-center cursor-pointer'>
				{alreadyLiked ? (
					<div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997]'
						onClick={handleDisLike}>
						<MdFavorite className='text-lg md:text-2xl' />
					</div>
				):(
					<div className='bg-primary rounded-full p-2 md:p-4'
						onClick={handleLike}>
						<MdFavorite className='text-lg md:text-2xl' />
					</div>
				)}
				<p className='text-md font-semibold'>{likes?.length || 0}</p>
			</div>
			
		</div>
  	)
}

export default LikeButton