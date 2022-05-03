import React from 'react'

const ChatMessages = () => {
  return (
	  <div className='flex-[1] px-5 flex flex-col h-full'>
		  
		  {/* Header */}
		  <div className="my-5">
			  <h2>Chat with</h2>
			  <h1 className='font-bold text-lg'>Martin Kamau</h1>
		  </div>
		  <div className="bg-gray-100 p-4 min-h-[600px]"></div>
		  <div className="py-5 bg-slate-400 mt-5"></div>
	</div>
  )
}

export default ChatMessages