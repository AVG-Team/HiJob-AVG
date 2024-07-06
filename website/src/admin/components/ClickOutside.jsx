import React, { useRef, useEffect } from 'react';
import PropTypes from "prop-types";

ClickOutside.propTypes = {
    children: React.ReactNode,
    exceptionRef: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired
}

export default function ClickOutside({
                                         children,
                                         exceptionRef,
                                         onClick,
                                         className,
                                     }) {
    useEffect(() => {
        const handleClickListener = (event) => {
            if (
                !exceptionRef?.current?.contains(event.target) &&
            !exceptionRef?.current?.isSameNode(event.target) &&
            !exceptionRef?.current?.contains(event.target) &&
            !event.target.closest(`.${className}`)
        ) {
                onClick();
            }
        };

        document.addEventListener('mousedown', handleClickListener);

        return () => {
            document.removeEventListener('mousedown', handleClickListener);
        };
    }, [exceptionRef, onClick, className]);

    return (
        <div className={className}>
            {children}
        </div>
    );
}
