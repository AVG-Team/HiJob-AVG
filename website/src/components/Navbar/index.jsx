import { useEffect, useState } from "react";
import Logo from "../../assets/img/HIJOB-Landscape.png";
import { checkAuth, getUserInfo } from "../../services/auth/auth.js";
import { AccountCircle, Logout } from "@mui/icons-material";

const mainLinks = [
    { id: 1, label: "Việc Làm", href: "/", submenu: [] },
    {
        id: 2,
        label: "Công Ty",
        href: "/",
        submenu: [
            {
                id: 21,
                label: "Company 1",
                href: "/company1",
                submenu: [
                    { id: 211, label: "Submenu 1", href: "/company1/sub1" },
                    { id: 212, label: "Submenu 2", href: "/company1/sub2" },
                ],
            },
            { id: 22, label: "Company 2", href: "/company2", submenu: [] },
        ],
    },
    { id: 3, label: "Tin Tức", href: "/", submenu: [] },
];

export default function Navbar() {
    const [scrollpos, setScrollpos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            setScrollpos(currentPosition);
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

    useEffect(() => {
        setIsScrolled(scrollpos > 10);
    }, [scrollpos]);

    useEffect(() => {
        const handleDropdownHover = () => {
            const dropdowns = document.querySelectorAll(".dropdown");

            dropdowns.forEach((dropdown) => {
                dropdown.addEventListener("mouseenter", () => {
                    const submenu = dropdown.querySelector(".submenu");
                    if (submenu) submenu.classList.add("block");
                });
                dropdown.addEventListener("mouseleave", () => {
                    const submenu = dropdown.querySelector(".submenu");
                    if (submenu) submenu.classList.remove("block");
                });
            });
        };

        handleDropdownHover();

        return () => {
            const dropdowns = document.querySelectorAll(".dropdown");

            dropdowns.forEach((dropdown) => {
                dropdown.removeEventListener("mouseenter", () => {});
                dropdown.removeEventListener("mouseleave", () => {});
            });
        };
    }, []);

    return (
        <nav id="header" className={`w-full bg-white ${isScrolled ? "fixed shadow-md z-50" : "shadow-md"}`}>
            <div className="container flex flex-wrap items-center justify-between w-full py-3 mx-auto mt-0">
                <div className="flex items-center pl-4">
                    <ul className="items-center flex-1 list-reset lg:flex">
                        <li className="flex items-center mr-3">
                            <a className="inline-block py-2 font-bold text-black no-underline" href="/">
                                <img src={Logo} alt="logo" className="h-10" />
                            </a>
                        </li>
                        {mainLinks.map((link) => (
                            <li key={link.id} className="relative items-center hidden mr-3 lg:flex dropdown">
                                <a
                                    className="inline-block px-4 py-2 font-bold text-black no-underline hover:text-primary"
                                    href={link.href}
                                >
                                    {link.label}
                                </a>
                                {link.submenu.length > 0 && (
                                    <ul className="absolute left-0 hidden mt-2 bg-white shadow-md submenu">
                                        {link.submenu.map((submenu) => (
                                            <li key={submenu.id} className="relative dropdown">
                                                <a
                                                    className="block px-4 py-2 text-black whitespace-no-wrap hover:bg-gray-200"
                                                    href={submenu.href}
                                                >
                                                    {submenu.label}
                                                </a>
                                                {submenu.submenu && submenu.submenu.length > 0 && (
                                                    <ul className="absolute top-0 hidden mt-2 bg-white shadow-md left-full submenu">
                                                        {submenu.submenu.map((subsubmenu) => (
                                                            <li key={subsubmenu.id}>
                                                                <a
                                                                    className="block px-4 py-2 text-black whitespace-no-wrap hover:bg-gray-200"
                                                                    href={subsubmenu.href}
                                                                >
                                                                    {subsubmenu.label}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
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
                        <button className="px-4 py-3 mx-auto mt-4 mr-2 font-bold border rounded-md shadow text-primary border-primary lg:mx-2 opacity-80 hover:text-primary lg:mt-0 hover:bg-slate-50 hover:shadow-lg">
                            Nhà tuyển dụng
                        </button>
                    ) : (
                        ""
                    )}
                    {!isAuth ? (
                        <a
                            href="/login"
                            className="px-4 py-3 mx-auto mt-4 ml-2 font-bold text-white rounded-md shadow lg:mx-0 bg-primary opacity-80 lg:mt-0 hover:bg-primary-600 hover:shadow-lg"
                        >
                            Đăng nhập
                        </a>
                    ) : (
                        <>
                            <a
                                href="/profile"
                                className="px-4 py-3 mx-auto mt-4 ml-2 font-bold text-white rounded-md shadow lg:mx-2 bg-primary opacity-80 lg:mt-0 hover:bg-primary-600 hover:shadow-lg"
                            >
                                <AccountCircle />
                                {name}
                            </a>

                            <a
                                href="/logout"
                                className="px-4 py-3 mx-auto mt-4 ml-2 font-bold text-white rounded-md shadow lg:mx-0 bg-primary opacity-80 lg:mt-0 hover:bg-primary-600 hover:shadow-lg"
                            >
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
