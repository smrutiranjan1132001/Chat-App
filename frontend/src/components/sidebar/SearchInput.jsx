import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const [filteredConversations, setFilteredConversations] = useState([]);
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	// Debounced search state
	const [debouncedSearch, setDebouncedSearch] = useState("");

	// Debounce logic
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(search.trim());
		}, 300); // 300ms debounce time
		return () => clearTimeout(handler);
	}, [search]);

	// Filter conversations based on search
	useEffect(() => {
		if (debouncedSearch.length >= 3) {
			const results = conversations.filter((c) =>
				c.fullName.toLowerCase().includes(debouncedSearch.toLowerCase())
			);
			setFilteredConversations(results);
		} else {
			setFilteredConversations([]);
		}
	}, [debouncedSearch, conversations]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!debouncedSearch) return;

		if (debouncedSearch.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		// Check if there's an exact match
		const conversation = conversations.find((c) =>
			c.fullName.toLowerCase().includes(debouncedSearch.toLowerCase())
		);

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch(""); // Clear the search input
		} else {
			toast.error("No such user found!");
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2 relative'>
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>

			{/* Search suggestions */}
			{debouncedSearch.length >= 3 && filteredConversations.length > 0 && (
				<ul className='absolute top-full mt-2 bg-white border rounded-lg shadow-md w-full z-10'>
					{filteredConversations.map((conversation) => (
						<li
							key={conversation.id}
							className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
							onClick={() => {
								setSelectedConversation(conversation);
								setSearch(""); // Clear the input
							}}
						>
							{conversation.fullName}
						</li>
					))}
				</ul>
			)}

			{/* No results message */}
			{debouncedSearch.length >= 3 && filteredConversations.length === 0 && (
				<p className='absolute top-full mt-2 bg-white border rounded-lg shadow-md w-full z-10 px-4 py-2 text-center'>
					No users found.
				</p>
			)}
		</form>
	);
};

export default SearchInput;
