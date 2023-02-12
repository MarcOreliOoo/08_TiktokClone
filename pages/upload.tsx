import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';

import useAuthStore from '../store/authStore';
import { topics } from '../utils/constants';
import { client } from '../utils/client';
import { text } from 'stream/consumers';
import { BASE_URL } from '../utils/index';

const Upload = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
	const [wrongFileType, setWrongFileType] = useState(false);
	const [caption, setCaption] = useState('');
	const [category, setCategory] = useState(topics[0].name);
	const [savingPost, setSavingPost] = useState(false);
	const router = useRouter();

	const { userProfile }: { userProfile: any} = useAuthStore();

	const uploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if(e.target.files){
			const selectedFile = e.target.files[0];
			const fileTypes = ['video/mp4','video/webm','video/ogg'];
			
			if (fileTypes.includes(selectedFile.type)) {
				client.assets.upload('file', selectedFile, {
					contentType: selectedFile.type,
					filename: selectedFile.name
				}).then((data) => {
					setVideoAsset(data);
					setIsLoading(false);
				});
			} else {
				setIsLoading(false);
				setWrongFileType(true);
			}
		}
	}

	const handlePost = async () => {
		if(caption && videoAsset?._id && category){
			setSavingPost(true);

			const document = {
				_type: "post",
				caption,
				video: {
					_type: "file",
					asset: {
						_type: 'reference',
						_ref: videoAsset._id
					}
				},
				userId: userProfile?._id,
				postedBy: {
					_type: "postedBy",
					_ref:userProfile?._id
				},
				topic: category
			}

			await axios.post(`${BASE_URL}/api/post`, document);

			router.push('/');
		}
	}
	
	return (
		<div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
			<div className='bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between items-center p-14 pt-6 w-[65%]'>
				
				{/* Upload Video Div */}
				<div>
					<div>
						<p className='text-xl font-bold'>
							Upload Video
						</p>
						<p className='text-md text-gray-400 mt-1'>
							Post a video to your account
						</p>
					</div>
					<div className='border-dashed rounded-xl border-4 border-gray-200 
						flex flex-col justify-center items-center outline-none
						mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
						{isLoading ? (
							<p>Uploading...</p>
						) : (
							<div>
								{videoAsset ? (
									<div>
										<video
											src={videoAsset.url}
											loop
											controls
											className='rounded-xl h-[450px] mt-16 bg-black'
										>
										</video>
									</div>
								) : ( 
									<label className='cursor-pointer'>
										<div className='flex flex-col items-center justify-center h-full'>
											<div className='flex flex-col items-center justify-center'>
												<p className='font-bold text-xl'>
													<FaCloudUploadAlt className='text-gray-300 text-6xl'/>
												</p>
												<p className='font-semibold text-xl'>
													Upload video
												</p>
											</div>
											<p className='text-gray-400 text-center mt-10 text-sm leading-10'>
												MP4 or WebM or ogg <br />
												720x1280 or higher <br />
												Up to 10 minutes <br />
												Less than 2GB
											</p>
											<p className='bg-[#F51997] text-white mt-10 rounded text-md font-medium p-2 w-52 text-center outline-none'>
												Select File
											</p>
										</div>
										<input 
											type="file"
											name="upload-video" 
											onChange={(e) => uploadVideo(e)}
											className='w-0 h-0'
										/>
									</label>
								)}	
							</div>
						)}
						{wrongFileType && (
							<p className='text-center text-xl text-red-40 font-semibold mt-4 w-[250px]'>
								Please select a video file
							</p>
						)}
					</div>
				</div>

				{/* Upload Form on the right of the video upload for categories */}
				<div className='flex flex-col gap-3 pb-10'>
					<label className='text-md font-medium'>Caption</label>
					<input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className='rounded outline-none text-md border-2 border-gray-200 p-2' />
					<label className='text-md font-medium'>Choose a category</label>
					<select onChange={(e) => setCategory(e.target.value)} className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'>
						{topics.map((topic) => (
							<option key={topic.name} className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300' value={topic.name}>
								{topic.name}
							</option>
						))}
					</select>
					{/* buttons container */}
					<div className='flex gap-6 mt-10'>
						<button onClick={() => {}} type="button" className='border-gray-300 border-2 text-md p-2 lg:w-44 w-28 rounded font-medium outline-none'>
							Discard
						</button>
						<button onClick={handlePost} type="button" className='bg-[#F51997] text-white text-md p-2 lg:w-44 w-28 rounded font-medium outline-none'>
							Post
						</button>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Upload;