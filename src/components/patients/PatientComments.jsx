import React from "react";
import { HiCalendar } from "react-icons/hi";
import { Tab } from "@headlessui/react";

const PatientComments = () => {
    return (
        <div className="p-4 flex-[1] rounded bg-white _shadow self-stfart">
            <h3 className="text-md mb-4 font-bold">Comments</h3>

            <div className="my-4">
                <Tab.Group>
                    <Tab.List className="flex space-x-5">
                        {["Generay", "Doctor's", "Confidential"].map((category) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    `
                  'w-full py-1.5 text-md px-2 font-medium leading-5 text-blue-700',
                  'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2',
                  ${
                      selected
                          ? "border-b-2 border-steelblue bg-flowerblue bg-opacity-25 rounded-t-md text-white px-7"
                          : "text-slate-800 hover:bg-white/[0.12] hover:text-slate-900"
                  }
                `
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>
                </Tab.Group>
            </div>
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
