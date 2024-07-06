import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import UserOne from '../../images/user/user-01.png';

export default function DropdownUser () {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
            <Link
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4 group"
                to="#"
            >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black">
            Thomas Anree
          </span>
          <span className="block text-xs">UX Designer</span>
        </span>

                <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User"/>
        </span>

                <svg
                    className="hidden fill-current sm:block group-hover:text-primary"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                        fill=""
                    />
                </svg>
            </Link>

            {/* <!-- Dropdown Start --> */}
            {dropdownOpen && (
                <div
                    className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default`}
                >
                    <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5">
                        <li>
                            <Link
                                to="/profile"
                                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                            >
                                <svg
                                    className="fill-current"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                                        fill=""
                                    />
                                    <path
                                        d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                                        fill=""
                                    />
                                </svg>
                                My Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                            >
                                <svg
                                    className="fill-current"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.6687 1.44374C17.1187 0.893744 16.4312 0.618744 15.675 0.618744H7.42498C6.25623 0.618744 5.25935 1.58124 5.25935 2.78437V4.12499H4.29685C3.88435 4.12499 3.50623 4.46874 3.50623 4.91562C3.50623 5.36249 3.84998 5.70624 4.29685 5.70624H5.25935V10.2781H4.29685C3.88435 10.2781 3.50623 10.6219 3.50623 11.0687C3.50623 11.4812 3.84998 11.8594 4.29685 11.8594H5.25935V16.4312H4.29685C3.88435 16.4312 3.50623 16.775 3.50623 17.2219C3.50623 17.6687 3.84998 18.0125 4.29685 18.0125H5.25935V19.25C5.25935 20.4187 6.22185 21.4156 7.42498 21.4156H15.675C17.2218 21.4156 18.4937 20.1437 18.5281 18.5969V3.47187C18.4937 2.68124 18.2187 1.95937 17.6687 1.44374ZM16.9469 18.5625C16.9469 19.2844 16.3625 19.8344 15.6406 19.8344H7.3906C7.04685 19.8344 6.77185 19.5594 6.77185 19.2156V17.875H8.6281C9.0406 17.875 9.41873 17.5312 9.41873 17.0844C9.41873 16.6375 9.07498 16.2937 8.6281 16.2937H6.77185V11.7906H8.6281C9.0406 11.7906 9.41873 11.4469 9.41873 11C9.41873 10.5875 9.07498 10.2094 8.6281 10.2094H6.77185V5.63749H8.6281C9.0406 5.63749 9.41873 5.29374 9.41873 4.84687C9.41873 4.39999 9.07498 4.05624 8.6281 4.05624H6.77185V2.74999C6.77185 2.40624 7.04685 2.13124 7.3906 2.13124H15.675C15.8594 2.13124 16.0437 2.19999 16.1594 2.31562C16.2437 2.39999 16.3625 2.58437 16.3969 2.73437V18.5625H16.9469Z"
                                        fill=""
                                    />
                                </svg>
                                My Invoice
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                            >
                                <svg
                                    className="fill-current"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19.25 21.4156H2.75C1.90312 21.4156 1.21875 20.7312 1.21875 19.8844V7.03749C1.21875 6.59062 1.5625 6.21249 2.00935 6.21249C2.45623 6.21249 2.83435 6.59062 2.83435 7.03749V19.8344H19.1656V7.03749C19.1656 6.59062 19.5437 6.21249 19.9906 6.21249C20.4375 6.21249 20.8156 6.59062 20.8156 7.03749V19.8844C20.7812 20.7312 20.0969 21.4156 19.25 21.4156Z"
                                        fill=""
                                    />
                                    <path
                                        d="M20.3156 5.31561H1.68435C1.23748 5.31561 0.85935 4.93749 0.85935 4.49061V2.63749C0.85935 1.75312 1.57185 1.04061 2.4906 1.04061H19.5094C20.3937 1.04061 21.1406 1.75312 21.1406 2.63749V4.49061C21.1406 4.93749 20.7625 5.31561 20.3156 5.31561ZM2.5781 3.90936H19.4219V2.75936H2.5781V3.90936Z"
                                        fill=""
                                    />
                                    <path
                                        d="M16.9468 18.6125H5.05309C4.60622 18.6125 4.22809 18.2344 4.22809 17.7875V9.10623C4.22809 8.65936 4.60622 8.28123 5.05309 8.28123H16.9468C17.3937 8.28123 17.7718 8.65936 17.7718 9.10623V17.7875C17.7718 18.2344 17.3937 18.6125 16.9468 18.6125ZM5.8781 16.9437H16.1218V9.93123H5.8781V16.9437Z"
                                        fill=""
                                    />
                                </svg>
                                Settings
                            </Link>
                        </li>
                    </ul>
                    <button
                        className="flex items-center gap-3.5 py-4 px-7.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    >
                        <svg
                            className="fill-current"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.3781 14.8781C12.9938 14.4938 12.9938 13.8562 13.3781 13.4719L15.65 11.2L13.3781 8.92807C12.9938 8.54382 12.9938 7.90632 13.3781 7.52207C13.7623 7.13782 14.3998 7.13782 14.784 7.52207L17.7562 10.4938C18.1405 10.8781 18.1405 11.5156 17.7562 11.8998L14.784 14.8719C14.3998 15.2562 13.7623 15.2562 13.3781 14.8781Z"
                                fill=""
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.99998 12.0187H16.0718C16.5968 12.0187 16.9999 11.6156 16.9999 11.0906C16.9999 10.5656 16.5968 10.1625 16.0718 10.1625H4.99998C4.47498 10.1625 4.07185 10.5656 4.07185 11.0906C4.07185 11.6156 4.47498 12.0187 4.99998 12.0187Z"
                                fill=""
                            />
                        </svg>
                        Log Out
                    </button>
                </div>
            )}
            {/* <!-- Dropdown End --> */}
        </ClickOutside>
    );
};