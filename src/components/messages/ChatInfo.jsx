import React from "react";
import { FaChevronCircleRight } from "react-icons/fa";

const ChatInfo = ({ chatInfoOpen, setChatInfoOpen }) => {

    // const handleClickOutside = (e) => {
    //     if (chatInfomenuRef && !chatInfomenuRef?.current?.contains(e.target)) {
    //         if (chatInfoOpen) setChatInfoOpen(false);
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener("click", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("click", handleClickOutside);
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <div
            className={`w-[300px] pl-5 absolute bg-white right-0 top-0 bottom-0 lg:static  transition-all duration-200 ease-linear ${
                chatInfoOpen
                    ? "block scale-100"
                    : " hidden scale-0 lg:scale-100 lg:block"
            }`}
        >
            <div className="flex items-center gap-5 lg:justify-center py-4">
                <FaChevronCircleRight
                    onClick={() => setChatInfoOpen(false)}
                    className="cursor-pointer lg:hidden text-lg opacity-70"
                />
                <h2 className="text-xl opacity-80 font-bold">Chat Info</h2>
            </div>
        </div>
    );
};

export default ChatInfo;
