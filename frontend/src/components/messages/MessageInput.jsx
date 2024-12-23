
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
    const [message,setMessage] = useState("");
    const {loading,sendMessage} = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!message) return;
        await sendMessage(message);
		setMessage("");
    }
    return (
        <form className='px-4 my-3'onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
                </button>
                {/* <button className="absolute inset-y-0 end-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button> */}
                
            </div>
        </form>
    );
};
export default MessageInput;