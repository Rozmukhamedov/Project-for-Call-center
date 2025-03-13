import React from 'react';
import Tabs, { TabsProps } from 'react-bootstrap/Tabs';

interface TabProps extends TabsProps {
    children?: React.ReactNode
}

export const TabBar = (props: TabProps) => {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
            {...props}
        >
            {props.children}
        </Tabs >
    );
}
