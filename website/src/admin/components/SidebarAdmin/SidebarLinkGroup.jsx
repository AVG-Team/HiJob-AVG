import React, { useState } from 'react';

export default function SidebarLinkGroup({ children, activeCondition }) {
    const [open, setOpen] = useState(activeCondition);

    const handleClick = () => {
        setOpen(!open);
    };

    return <li>{children(handleClick, open)}</li>;
}
