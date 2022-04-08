import React from "react";
import { HiCalendar } from "react-icons/hi";

const PatientComments = () => {
    return (
        <div className="p-4 flex-[1] rounded bg-white _shadow self-stfart">
            <h3 className="text-md mb-4 font-bold">Comments</h3>
            <p className="text-sm my-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
                distinctio vero non libero nisi in voluptatibus atque, ut alias
                ipsum?
            </p>

            <div className="flex w-3/4 my-5">
                <table className="w-full">
                    <thead className="text-left">
                        <tr className="border-b">
                            <td className="py-2 font-bold text-sm">
                                Full Name
                            </td>
                            <td className="py-2 text-sm">Martin Mwangi</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-2 text-sm font-bold">Mobile</td>
                            <td className="py-2  text-sm">
                                (+435) 06355727453
                            </td>
                        </tr>

                        <tr className="border-b">
                            <td className="py-2 text-sm font-bold">Email</td>
                            <td className="py-2  text-sm">
                                mwjdjhdjjtyFG@hh.com
                            </td>
                        </tr>

                        <tr className="border-b">
                            <td className="py-1 text-sm font-bold">Location</td>
                            <td className="py-1  text-sm">
                                New York, United States
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="flex flex-col text-sm space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                    <HiCalendar className="text-flowerblue" />
                    <span>Last Visit</span>
                </div>
                <h4 className="text-md opacity-80">08 Sept, 2019</h4>
            </div>
        </div>
    );
};

export default PatientComments;
