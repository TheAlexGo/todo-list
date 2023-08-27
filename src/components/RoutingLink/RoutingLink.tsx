import React, { type FC, type JSX } from 'react';

import { Link, useLocation } from 'react-router-dom';

import type { LinkProps } from 'react-router-dom';

export interface ILink extends LinkProps {}

export const RoutingLink: FC<ILink> = ({ ...props }): JSX.Element => {
    const location = useLocation();
    return <Link {...props} state={{ ...props.state, from: location }} />;
};
