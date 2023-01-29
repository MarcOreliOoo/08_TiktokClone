import React, { useState, useEffect, useRef } from 'react';
import { Video } from '../types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';


interface IProps{
	post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {

	console.log('From videoCard:'+post.caption);

  	return (
		<div className='flex flex-col border-p-2 border-gray-200 pb-6'>
			<div>
				<div className='flex gap-3 cursor-pointer p-2 font-semibold rounded'>
					{/* for profil pic on each post*/}
					<div className='md:w-16 md:h-16 w-10 h-10'>
						<Link href="/">
							<>1h36:52
							</>
						</Link>
					</div>
				</div>
			</div>
		</div>
  	)
}

export default VideoCard