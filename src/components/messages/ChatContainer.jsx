import React from 'react'
import { useSelector } from 'react-redux';

const ChatContainer = ({ chat }) => {
	const { authDetails } = useSelector((state) => state.authState);
  return (
	  <div className={`flex my-4 ${chat?.sender?._id === authDetails?._id && "justify-end"}`}>
		  <div className={`${chat?.sender?._id !== authDetails?._id ? "bg-gray-200 rounded-bl-none":"bg-steelblue bg-opacity-20 rounded-br-none"} inline-block px-4 pt-4 pb-2 rounded-2xl  max-w-[50%] text-xs`}>
			  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto id sequi iste.</p>
			  <div className={`flex text-flowerblue ${chat?.sender?._id === authDetails?._id ? "justify-end":"mt-1"}`}>
				  <span >2 hours ago</span>
			  </div>
		  </div>
	</div>
  )
}

export default ChatContainer