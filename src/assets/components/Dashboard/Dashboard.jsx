import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { FaHome, FaUsers } from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";

import { GiHamburgerMenu } from "react-icons/gi";

import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FiLogOut } from "react-icons/fi";
// import Marquee from "react-fast-marquee";
const Dashboard = () => {
   
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSignOut = () => {

        logOut()

            .then(
                navigate("/")
            )
            .catch()
    }

    const [open, setOpen] = useState(false);

    return (
        <div className='' >
            <div className='text-xl rounded-xl hover:border-orange-300 lg:hidden hover:border-2 w-9 h-9 absolute z-10 left-5'>
                <button onClick={() => setOpen(true)}><GiHamburgerMenu className='w-8 h-8 mx-auto text-orange-500' /></button>
            </div>
            <div className='flex gap-2 ' >

                
                    <div className={`absolute min-h-screen lg:sticky border-2  flex-grow bg-[#41dfe2] lg:block md:block top-0  md:left-0 lg:left-0  z-10  duration-1000  w-96 ${open ? 'left-0' : '-left-96'}`}>
                        <div className=' relative md:hidden lg:hidden'>
                            <button onClick={() => setOpen(false)} className='w-8 h-8 mr-0 absolute z-20 right-1 '><IoCloseSharp className='h-full w-full hover:w-7 text-slate-100 '></IoCloseSharp></button>
                        </div>
                        <div>
                            
                            <ul className="menu p-5 space-y-5 text-base text-black ">
                                

                                <div className=" flex flex-col justify-center items-center">
                                    {user && <img src={user?.photoURL} className="w-32 h-32 rounded-sm mx-auto" alt="" />}
                                    {/* <iframe src="https://lottie.host/embed/65591004-7a06-4cbe-a02b-22ebf6d7e43a/xqFjmy78YR.json" className="h-10 w-44"></iframe> */}


                                    {user && <p className="mx-auto text-lg font-bold"> {user?.displayName}</p>}

                                </div>


                                {
                                    user && <>
                                            <li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">

                                                <NavLink to='/dashboard/all-user'><FaUsers />All User</NavLink>
                                            </li>
                                           
                                            <li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">

                                                <NavLink to='/dashboard/statistics'><FcStatistics />Statistics</NavLink>
                                            </li></>
                                }
 


                                <li className="flex hover:bg-gray-700 hover:text-white hover:rounded-lg">
                                    <NavLink to='/'><FaHome></FaHome> Go Back To Home</NavLink>
                                </li>
                                <hr />
                                <li>
                                    {
                                        user ? <button onClick={handleSignOut} className="advanced-button flex">LogOut<span className=""><FiLogOut></FiLogOut></span></button> : <></>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                


                <div className='mt-10 w-full md:mt-0 lg:mt-0'>

                    <Outlet></Outlet>

                </div>


            </div>


        </div>
    );
};

export default Dashboard;