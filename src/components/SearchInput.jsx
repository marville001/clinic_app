import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ onSubmit }) => {
    const [search, setSearch] = useState("");
    return (
        <form
            onSubmit={e=> onSubmit(e, search)}
            className="p-2 h-12 bg-white flex items-center w-full md:w-[300px] relative rounded-md overflow-hidden"
        >
            <input
                placeholder="Search here..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-1 border-0 h-full text-sm absolute right-0 left-8 outline-none w-auto ring-0 focus:ring-0"
            />
            <FaSearch className="text-lg z-20" />
        </form>
    );
};

export default SearchInput;
