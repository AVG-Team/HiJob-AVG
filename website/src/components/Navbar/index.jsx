import { useEffect, useState } from "react";
import Logo from "../../assets/img/HIJOB-Landscape.png";
import {checkAuth, getUserInfo} from "../../services/auth/auth.js";
import {AccountCircle, Logout} from '@mui/icons-material';

const links = [
    { id: 1, label: "Việc Làm", href: "/" },
    { id: 2, label: "Công Ty", href: "/" },
    { id: 3, label: "Tin Tức", href: "/" },
];
export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        if (checkAuth()) {
            setIsAuth(true);
            const { nameTmp, role } = getUserInfo();
            setName(nameTmp);
            if (role === "USER") {
                setIsUser(true);
            }
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav id="header" className={`w-full bg-white ${isScrolled ? "fixed shadow-md opacity-80 z-50" : "shadow-md"}`}>
            <div className="container flex flex-wrap items-center justify-between w-full py-3 mx-auto mt-0">
                <div className="flex items-center pl-4">
                    <ul className="items-center flex-1 list-reset lg:flex">
                        <li className="flex items-center mr-3">
                            <a className="inline-block py-2 font-bold text-black no-underline" href="/">
                                <img src={Logo} alt="logo" className="h-10" />
                            </a>
                        </li>
                        {links.map((link) => (
                            <li key={link.id} className="items-center hidden mr-3 lg:flex">
                                <a
                                    className="inline-block px-4 py-2 font-bold text-black no-underline hover:text-primary"
                                    href={link.href}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="block pr-4 lg:hidden">
                    <button aria-label="hamburger" id="hamburger" className="relative p-6 -mr-6">
                        <div
                            aria-hidden="true"
                            id="line"
                            className="m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300"
                        ></div>
                        <div
                            aria-hidden="true"
                            id="line2"
                            className="m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300"
                        ></div>
                    </button>
                </div>
                <div
                    className="z-20 justify-end flex-grow hidden w-full p-4 mx-4 text-black lg:flex lg:items-center lg:w-auto lg:p-0"
                    id="nav-content"
                >
                    {isAuth && !isUser ? (
                        <button
                            className="px-4 py-3 mx-auto mt-4 mr-2 font-bold border rounded-md shadow text-primary border-primary lg:mx-2 opacity-80 hover:text-primary lg:mt-0 hover:bg-slate-50 hover:shadow-lg">
                            Nhà tuyển dụng
                        </button>
                    ) : "" }
                    {!isAuth ? (
                        <a href="/login"
                           className="px-4 py-3 mx-auto mt-4 ml-2 font-bold text-white rounded-md shadow lg:mx-0 bg-primary opacity-80 lg:mt-0 hover:bg-primary-600 hover:shadow-lg">
                            Đăng nhập
                        </a>
                    ) : (
                        <>
                            <a href="/profile"
                               className="px-4 py-3 mx-auto mt-4 ml-2 font-bold text-white rounded-md shadow lg:mx-2 bg-primary opacity-80 lg:mt-0 hover:bg-primary-600 hover:shadow-lg">
                                <AccountCircle />
                                {name}
                            </a>

                            <a href="/logout"
                               className="px-4 py-3 mx-auto mt-4 ml-2 font-bold text-white rounded-md shadow lg:mx-0 bg-primary opacity-80 lg:mt-0 hover:bg-primary-600 hover:shadow-lg">
                                <Logout />
                                Logout
                            </a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
