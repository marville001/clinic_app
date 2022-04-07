import React from "react";

const PatientPersonalDetails = () => {
    return (
        <div className="p-4 flex-[2] rounded bg-white _shadow self-start">
            <h3 className="text-md mb-4 font-bold">Personal Information</h3>
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
        </div>
    );
};

export default PatientPersonalDetails;
