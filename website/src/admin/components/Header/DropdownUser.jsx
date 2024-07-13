import {useState} from 'react';
import {Link} from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import UserOne from '../../images/user/user-01.png';
import {getUserInfo} from "../../../services/auth/auth.js";
import {AdminPanelSettingsOutlined} from '@mui/icons-material';

export default function DropdownUser() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
            <Link
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4 group"
                to="#"
            >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black group-hover:text-primary">
            {getUserInfo().name}
          </span>
          <span className="block text-xs group-hover:text-primary">{getUserInfo().role}</span>
        </span>

                <span className="h-8 w-8 rounded-full flex items-center">
                    <AdminPanelSettingsOutlined className="!w-8 !h-8 group-hover:text-primary"/>
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
                                target="_blank"
                                rel="noopener noreferrer"
                                to="/thong-tin-ca-nhan"
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
                                Thông Tin Cá Nhân
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/ve-trang-web"
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
                                Cài Đặt Trang Web
                            </Link>
                        </li>
                    </ul>
                    <a href="/admin/logout"
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
                        Đăng Xuất
                    </a>
                </div>
            )}
            {/* <!-- Dropdown End --> */}
        </ClickOutside>
    );
};