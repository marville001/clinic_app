import React from 'react'
import { useSelector } from 'react-redux';
import { format } from "timeago.js";

const ChatContainer = ({ chat }) => {
	const { authDetails } = useSelector((state) => state.authState);
  return (
	  <div className={`flex my-4 ${chat?.sender?._id === authDetails?._id && "justify-end"}`}>
		  <div className={`${chat?.sender?._id !== authDetails?._id ? "bg-gray-200 rounded-bl-none":"bg-steelblue bg-opacity-20 rounded-br-none"} inline-block px-4 pt-4 pb-2 rounded-2xl  max-w-[50%] text-xs`}>
			  <p>{chat?.content}</p>
			  <div className={`flex text-flowerblue ${chat?.sender?._id === authDetails?._id ? "justify-end":"mt-1"}`}>
				  <span >{format(chat?.updatedAt, "en_US")}</span>
			  </div>
		  </div>
	</div>
  )
}

export default ChatContainer