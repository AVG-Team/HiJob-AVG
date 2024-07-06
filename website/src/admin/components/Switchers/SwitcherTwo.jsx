import React, { useState } from 'react';

export default function SwitcherTwo() {
    const [enabled, setEnabled] = useState(false);

    return (
        <div x-data="{ switcherToggle: false }">
            <label
                htmlFor="toggle2"
                className="flex cursor-pointer select-none items-center"
            >
                <div className="relative">
                    <input
                        id="toggle2"
                        type="checkbox"
                        className="sr-only"
                        onChange={() => {
                            setEnabled(!enabled);
                        }}
                    />
                    <div className="h-5 w-14 rounded-full bg-meta-9 shadow-inner"></div>
                    <div
                        className={`dot absolute left-0 -top-1 h-7 w-7 rounded-full bg-white shadow-switch-1 transition ${
                            enabled && '!right-0 !translate-x-full !bg-primary'
                        }`}
                    ></div>
                </div>
            </label>
        </div>
    );
}
