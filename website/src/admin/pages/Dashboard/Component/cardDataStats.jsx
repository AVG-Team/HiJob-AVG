import React, { ReactNode } from 'react';

export default function CardDataStats({ title, total, rate, levelUp, levelDown, children }) {
    return (
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default text-center">
            <div className="w-full flex justify-center">
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2">
                    {children}
                </div>
            </div>

            <div className="mt-4 flex justify-center w-full">
                <div>
                    <h4 className="text-title-md font-bold text-black">
                        {total}
                    </h4>
                    <span className="text-sm font-medium">{title}</span>
                </div>
            </div>
        </div>
    );
}