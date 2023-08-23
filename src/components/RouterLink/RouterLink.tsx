import React, { FC, JSX } from 'react';

import { Link, LinkProps, useLocation } from 'react-router-dom';

interface ILink extends LinkProps {}

export const RouterLink: FC<ILink> = ({ ...props }): JSX.Element => {
    const location = useLocation();
    return <Link {...props} state={{ ...props.state, from: location }} />;
};
