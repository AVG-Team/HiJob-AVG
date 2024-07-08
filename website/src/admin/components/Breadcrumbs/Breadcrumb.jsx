import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ pageName }) {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-semibold text-black">
                {pageName}
            </h2>

            <nav>
                <ol className="flex items-center gap-2">
                    <li>
                        <Link className="font-medium" to="/admin">
                            Trang Chủ /
                        </Link>
                    </li>
                    <li className="font-medium text-primary">{pageName}</li>
                </ol>
            </nav>
        </div>
    );
}
