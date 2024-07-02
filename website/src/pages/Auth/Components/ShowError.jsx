import React from "react";

export default function ShowError({errorString}) {
    return <div className="mt-2">
        <div
            className={`bg-red-100 text-red-500 p-4 ${errorString.length !== 0 ? "" : "hidden"}`}
            role="alert">
            {errorString}
        </div>
    </div>
}