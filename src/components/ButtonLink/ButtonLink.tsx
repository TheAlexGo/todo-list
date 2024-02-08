import React, { type FC, type JSX } from 'react';

import { Button, type IButton } from '@components/Button/Button';
import { type ILink, RoutingLink } from '@components/RoutingLink/RoutingLink';

interface IButtonLink extends IButton {}

type ButtonLinkProps = IButtonLink & ILink;

export const ButtonLink: FC<ButtonLinkProps> = ({ view, size, fullWidth, children, ...props }): JSX.Element => (
    <RoutingLink {...props}>
        <Button view={view} size={size} fullWidth={fullWidth}>
            {children}
        </Button>
    </RoutingLink>
);
