import React from 'react';
import {Link} from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../../assets/img/HIJOB.png';
import {InputAdornment, TextField} from "@mui/material";
import CustomInput from "../../../components/Forms/Inputs/customColor.jsx";
import {Search} from "@mui/icons-material";

const Header = ({sidebarOpen, setSidebarOpen}) => {
    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
            <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSidebarOpen(!sidebarOpen);
                        }}
                        className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm lg:hidden"
                    >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out ${
                        !sidebarOpen && '!w-full delay-300'
                    }`}
                ></span>
                <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out ${
                        !sidebarOpen && 'delay-400 !w-full'
                    }`}
                ></span>
                <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out ${
                        !sidebarOpen && '!w-full delay-500'
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out ${
                        !sidebarOpen && '!h-0 !delay-[0]'
                    }`}
                ></span>
                <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out ${
                        !sidebarOpen && '!h-0 !delay-200'
                    }`}
                ></span>
              </span>
            </span>

                    </button>
                    {/* <!-- Hamburger Toggle BTN --> */}

                    <Link className="block flex-shrink-0 lg:hidden" to="/admin">
                        <img src={LogoIcon} alt="Logo" className="w-[20%]"/>
                    </Link>
                </div>

                <div className="hidden sm:block w-[30%]">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="relative">
                            <CustomInput
                                disabled
                                id="standard-basic"
                                variant="standard"
                                type="text"
                                placeholder="Type to search..."
                                className="!w-full opacity-0"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">

                        {/* <!-- Notification Menu Area --> */}
                        <DropdownNotification/>
                        {/* <!-- Notification Menu Area --> */}

                        {/* <!-- Chat Notification Area --> */}
                        <DropdownMessage/>
                        {/* <!-- Chat Notification Area --> */}
                    </ul>

                    {/* <!-- User Area --> */}
                    <DropdownUser/>
                    {/* <!-- User Area --> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
