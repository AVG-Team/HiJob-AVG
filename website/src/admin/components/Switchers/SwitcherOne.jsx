import React, { useState } from 'react';

export default function SwitcherOne() {
    const [enabled, setEnabled] = useState<boolean>(false);

    return (
        <div>
            <label
                htmlFor="toggle1"
                className="flex cursor-pointer select-none items-center"
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        id="toggle1"
                        className="sr-only"
                        onChange={() => {
                            setEnabled(!enabled);
                        }}
                    />
                    <div className="block h-8 w-14 rounded-full bg-meta-9"></div>
                    <div
                        className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                            enabled && '!right-1 !translate-x-full !bg-primary'
                        }`}
                    ></div>
                </div>
            </label>
        </div>
    );
}
