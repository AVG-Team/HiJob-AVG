import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../../assets/img/HIJOB-Landscape.png';
import {
    GroupOutlined,
    BusinessOutlined,
    DashboardOutlined,
    WorkOutlined,
    DevicesOutlined,
    MilitaryTechOutlined,
    TypeSpecimenOutlined,
    SettingsOutlined,
    LogoutOutlined,
    EngineeringOutlined
} from '@mui/icons-material';

export default function SidebarAdmin ({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef(null)
    const sidebar = useRef(null)

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target } ) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#1c2434] text-white duration-300 ease-linear lg:static lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/" className="flex justify-center">
                    <img src={Logo} alt="Logo" className="w-[80%]" />
                </NavLink>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden opacity-50 hover:opacity-100 transition-opacity"
                >
                    <svg
                        className="fill-current"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                            fill=""
                        />
                    </svg>
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    {/* <!-- Menu Group --> */}
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold">
                            MENU
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* <!-- Menu Item Dashboard --> */}
                            <li>
                                <NavLink
                                    to="/admin"
                                    className={`group hover:bg-graydark relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                                        pathname === "/admin" && 'bg-graydark'
                                    }`}
                                >
                                    <DashboardOutlined/>
                                    <p>Trang Chủ</p>
                                </NavLink>
                            </li>
                            {/* <!-- Menu Item Dashboard --> */}

                            {/* <!-- Menu Item Users --> */}
                            <li>
                                <NavLink
                                    to="/admin/users"
                                    className={`group hover:bg-graydark relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                                        pathname.includes('users') && 'bg-graydark'
                                    }`}
                                >
                                    <GroupOutlined/>
                                    <p>Quản Lý Người Dùng</p>
                                </NavLink>
                            </li>
                            {/* <!-- Menu Item Users --> */}

                            {/* <!-- Menu Item Users --> */}
                            <li>
                                <NavLink
                                    to="/admin/companies"
                                    className={`group hover:bg-graydark relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                                        pathname.includes('companies') && 'bg-graydark'
                                    }`}
                                >
                                    <BusinessOutlined/>
                                    <p>Quản Lý Công Ty</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/jobs"
                                    className={`group hover:bg-graydark relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                                        pathname.includes('jobs') && 'bg-graydark'
                                    }`}
                                >
                                    <WorkOutlined/>
                                    <p>Quản Lý Công Việc</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/skills"
                                    className={`group hover:bg-graydark relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                                        pathname.includes('skills') && 'bg-graydark'
                                    }`}
                                >
                                    <DevicesOutlined/>
                                    <p>Quản Lý Kỹ Năng</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/roles"
                                    className={`group hover:bg-graydark relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                                        pathname.includes('roles') && 'bg-graydark'
                                    }`}
                                >
                                    <EngineeringOutlined/>
                                    <p>Quản Lý Vai Trò</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/levels"
                                    className={`group hover:bg-graydark relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                                        pathname.includes('levels') && 'bg-graydark'
                                    }`}
                                >
                                    <MilitaryTechOutlined/>
                                    <p>Quản Lý Level</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/job-types"
                                    className={`group hover:bg-graydark relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                                        pathname.includes('job-types') && 'bg-graydark'
                                    }`}
                                >
                                    <TypeSpecimenOutlined/>
                                    <p>Quản Lý Loại Công Việc</p>
                                </NavLink>
                            </li>
                            {/* <!-- Menu Item Users --> */}

                            {/* <!-- Menu Item Settings --> */}
                            <li>
                                <NavLink
                                    to="/admin/about"
                                    className={`group hover:bg-graydark relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out ${
                                        pathname.includes('about') && 'bg-graydark'
                                    }`}
                                >
                                    <SettingsOutlined />
                                    Về Chúng Tôi
                                </NavLink>
                            </li>
                            {/* <!-- Menu Item Settings --> */}

                            <li>
                                <NavLink
                                    to="/admin/logout"
                                    className={`group hover:bg-graydark relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out`}
                                >
                                    <LogoutOutlined />
                                    Đăng Xuất
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
        </aside>
    );
};
