import React, {useEffect} from 'react';

export default function ClickOutside({ children, exceptionRef, onClick, className }) {
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
