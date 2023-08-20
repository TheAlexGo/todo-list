import React, { FC, SVGProps } from 'react';

import LogoIcon from '@icons/logo.svg';
import UserTagIcon from '@icons/icon_usertag.svg';
import EyeSlashIcon from '@icons/icon_eye-slash.svg';
import EyeIcon from '@icons/icon_eye.svg';
import LockIcon from '@icons/icon_lock.svg';
import { TSvgComponent } from '../../types';

export enum Icons {
    Logo = 'Logo',
    UserTag = 'UserTag',
    Eye = 'Eye',
    EyeSlash = 'EyeSlash',
    Lock = 'Lock',
}

const icons: Record<Icons, TSvgComponent> = {
    Logo: LogoIcon,
    UserTag: UserTagIcon,
    Eye: EyeIcon,
    EyeSlash: EyeSlashIcon,
    Lock: LockIcon,
};

interface IIcon extends SVGProps<SVGSVGElement> {
    icon: Icons;
    size?: number;
}

export const Icon: FC<IIcon> = ({ icon, size = 24, ...props }): JSX.Element => {
    const SvgComponent = icons[icon];

    return <SvgComponent {...props} width={size} height={size} />;
};
