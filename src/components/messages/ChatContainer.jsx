import React from 'react'

const ChatContainer = ({index}) => {
  return (
	  <div className={`flex my-4 ${index % 2 === 0 && "justify-end"}`}>
		  <div className={`${index % 2 !== 0 ? "bg-gray-200 rounded-bl-none":"bg-steelblue bg-opacity-20 rounded-br-none"} inline-block px-4 pt-4 pb-2 rounded-2xl  max-w-[50%] text-xs`}>
			  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto id sequi iste.</p>
			  <div className={`flex text-flowerblue ${index % 2 === 0 ? "justify-end":"mt-1"}`}>
				  <span >2 hours ago</span>
			  </div>
		  </div>
	</div>
  )
}

export default ChatContainer