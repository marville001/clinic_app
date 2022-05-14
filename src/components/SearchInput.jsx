import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ value, onChange, onSubmit }) => {
    return (
        <form
            onSubmit={onSubmit}
            className="p-2 h-12 bg-white flex items-center w-[300px] relative rounded-md overflow-hidden"
        >
            <input
                placeholder="Search here..."
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="p-1 border-0 h-full text-sm absolute right-0 left-8 outline-none w-auto ring-0 focus:ring-0"
            />
            <FaSearch className="text-lg z-20" />
        </form>
    );
};

export default SearchInput;
