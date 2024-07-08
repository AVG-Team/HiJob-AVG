import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="pt-14 bg-gradient-to-b from-white to-primary-200 h-screen flex flex-col items-center justify-center text-primary-50">
            <img
                src="https://cdn.topdev.vn/v4/assets/images/common/400-error.png"
                alt="404 Error"
                className="w-1/3 mb-8"
            />
            <div className="flex flex-col items-center justify-center">
                <Link
                    to="/"
                    className="bg-white text-primary-500 px-4 py-2 rounded shadow hover:bg-gray-100"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
