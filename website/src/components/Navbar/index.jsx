import { useEffect, useState } from "react";
import Logo from "../../assets/img/HIJOB-Landscape.png";
const links = [
    { id: 1, label: "Việc Làm", href: "/" },
    { id: 2, label: "Công Ty", href: "/" },
    { id: 3, label: "Tin Tức", href: "/" },
];
export default function Navbar() {
    const [scrollpos, setScrollpos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            setScrollpos(currentPosition);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Empty dependency array ensures this effect runs only once

    useEffect(() => {
        setIsScrolled(scrollpos > 10);
    }, [scrollpos]);

    return (
        <nav
            id="header"
            className={`fixed w-full z-30 top-0 bg-white shadow-md ${isScrolled ? "shadow-md opacity-80" : ""}`}
        >
            <div className="container flex flex-wrap items-center justify-between w-full py-3 mx-auto mt-0">
                <div className="flex items-center pl-4">
                    <ul className="items-center flex-1 list-reset lg:flex">
                        <li className="flex items-center mr-3">
                            <a className="inline-block py-2 font-bold text-black no-underline" href="/">
                                <img src={Logo} alt="logo" className="h-10" />
                            </a>
                        </li>
                        {links.map((link) => (
                            <li key={link.id} className="flex items-center mr-3 ">
                                <a
                                    className="inline-block px-4 py-2 font-bold text-black no-underline hover:text-secondary"
                                    href={link.href}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="block pr-4 lg:hidden">
                    <button
                        id="nav-toggle"
                        className="flex items-center p-1 text-pink-800 transition duration-300 ease-in-out transform hover:text-gray-900 focus:outline-none focus:shadow-outline hover:scale-105"
                    >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <div
                    className="z-20 justify-end flex-grow w-full p-4 mx-4 text-black lg:flex lg:items-center lg:w-auto lg:p-0"
                    id="nav-content"
                >
                    <button className="px-4 py-3 mx-auto mt-4 mr-2 font-bold transition duration-300 ease-in-out transform border rounded-md shadow text-primary border-primary lg:mx-2 opacity-80 hover:text-primary lg:mt-0 focus:outline-none focus:shadow-outline hover:scale-105">
                        Nhà tuyển dụng
                    </button>
                    <button className="px-4 py-3 mx-auto mt-4 ml-2 font-bold text-white transition duration-300 ease-in-out transform rounded-md shadow lg:mx-0 bg-primary opacity-80 lg:mt-0 focus:outline-none focus:shadow-outline hover:scale-105">
                        Đăng nhập
                    </button>
                </div>
            </div>
            <hr className="py-0 my-0 border-b border-gray-100 opacity-25" />
        </nav>
    );
}
