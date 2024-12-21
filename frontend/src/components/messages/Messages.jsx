import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
    const {messages,loading} = useGetMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({behaviour : "smooth"})
        },500)
    },[messages])
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && (!messages || messages.length === 0) && (
				<p className='text-center'  style={{color : "red"}}>Send a message to start the conversation</p>
			)}
        </div>
    );
};
export default Messages;