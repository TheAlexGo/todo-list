import React, { FC, SVGProps } from 'react';

import LogoIcon from '@icons/logo.svg';
import LogoTextIcon from '@icons/logo_title.svg';
import UserIcon from '@icons/icon_user.svg';
import UserTagIcon from '@icons/icon_usertag.svg';
import EyeSlashIcon from '@icons/icon_eye-slash.svg';
import EyeIcon from '@icons/icon_eye.svg';
import LockIcon from '@icons/icon_lock.svg';
import GoogleIcon from '@icons/icon_google.svg';
import GithubIcon from '@icons/icon_github.svg';
import CheckboxEmptyIcon from '@icons/icon_checkbox-empty.svg';
import CheckboxFillIcon from '@icons/icon_checkbox-fill.svg';
import HomeIcon from '@icons/icon_home.svg';
import AddIcon from '@icons/icon_add.svg';
import SettingsIcon from '@icons/icon_settings.svg';
import ArrowLeftIcon from '@icons/icon_arrow-left.svg';
import ClockIcon from '@icons/icon_clock.svg';
import CalendarIcon from '@icons/icon_calendar.svg';
import { TSvgComponent } from '@types';

export enum Icons {
    LOGO = 'Logo',
    LOGO_TEXT = 'LogoText',
    USER = 'User',
    USER_TAG = 'UserTag',
    EYE = 'Eye',
    EYE_SLASH = 'EyeSlash',
    LOCK = 'Lock',
    GOOGLE = 'Google',
    GITHUB = 'Github',
    CHECKBOX_EMPTY = 'CheckboxEmpty',
    CHECKBOX_FILL = 'CheckboxFill',
    HOME = 'Home',
    ADD = 'Add',
    SETTINGS = 'Settings',
    ARROW_LEFT = 'ArrowLeft',
    CLOCK = 'Clock',
    CALENDAR = 'Calendar',
}

const icons: Record<Icons, TSvgComponent> = {
    Logo: LogoIcon,
    LogoText: LogoTextIcon,
    User: UserIcon,
    UserTag: UserTagIcon,
    Eye: EyeIcon,
    EyeSlash: EyeSlashIcon,
    Lock: LockIcon,
    Google: GoogleIcon,
    Github: GithubIcon,
    CheckboxEmpty: CheckboxEmptyIcon,
    CheckboxFill: CheckboxFillIcon,
    Home: HomeIcon,
    Add: AddIcon,
    Settings: SettingsIcon,
    ArrowLeft: ArrowLeftIcon,
    Clock: ClockIcon,
    Calendar: CalendarIcon,
};

interface IIcon extends SVGProps<SVGSVGElement> {
    icon: Icons;
    size?: number;
    isCustomSize?: boolean;
}

export const Icon: FC<IIcon> = ({
    icon,
    size = 24,
    isCustomSize = false,
    width: _width,
    height: _height,
    ...props
}): JSX.Element => {
    const SvgComponent = icons[icon];

    const width = isCustomSize ? _width : size;
    const height = isCustomSize ? _height : size;

    return <SvgComponent {...props} width={width} height={height} />;
};
