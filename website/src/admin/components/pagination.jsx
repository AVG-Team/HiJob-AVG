import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function Pagination({ query, setQuery, totalResults, resultsPerPage }) {
    const initialPage = parseInt(query.page, 10) || 0;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    useEffect(() => {
        setCurrentPage(parseInt(query.page, 10) || 0);
    }, [query.page]);

    const handlePageChange = (page) => {
        if (page < 0 || page >= totalPages) return;
        setCurrentPage(page);
        setQuery(prev => ({ ...prev, page: page.toString() }));
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    disabled={currentPage === 0}
                >
                    Trang Trước
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    disabled={currentPage === totalPages - 1}
                >
                    Trang Sau
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Xem <span className="font-medium">{currentPage * resultsPerPage + 1}</span> Đến <span
                        className="font-medium">{Math.min((currentPage + 1) * resultsPerPage, totalResults)}</span> Của{' '}
                        <span className="font-medium">{totalResults}</span> Kết Quả
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${currentPage !== 0 ? "hover:bg-primary hover:text-white" : ""} focus:z-20 focus:outline-offset-0`}
                            disabled={currentPage === 0}
                        >
                            <span className="sr-only">Trước</span>
                            <ChevronLeft />
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index)}
                                aria-current={currentPage === index ? 'page' : undefined}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === index ? 'bg-primary-500 text-white' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${currentPage === totalPages - 1 ? "" : "hover:bg-primary hover:text-white"} focus:z-20 focus:outline-offset-0`}
                            disabled={currentPage === totalPages - 1}
                        >
                            <span className="sr-only">Trang Sau</span>
                            <ChevronRight />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
