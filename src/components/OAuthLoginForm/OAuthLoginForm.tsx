import type { JSX, MouseEvent } from 'react';
import React from 'react';

import { Button, Buttons, ButtonSizes } from '@components/Button/Button';
import { Icon } from '@components/Icon/Icon';

import type { Icons } from '@components/Icon/Icon';

import classes from './OAuthLoginForm.module.scss';

interface IOAuthLoginForm<IProviderId extends string, IProvider extends object> {
    providers: Partial<Record<IProviderId, IProvider>>;
    icons: Partial<Record<IProviderId, Icons>>;
    titles: Partial<Record<IProviderId, string>>;
    onClick: (providerId: IProviderId) => void;
}

export const OAuthLoginForm = <IProviderId extends string, IProvider extends object>({
    providers,
    icons,
    titles,
    onClick,
}: IOAuthLoginForm<IProviderId, IProvider>): JSX.Element => {
    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        const button = e.target as HTMLButtonElement;
        const providerId = button.dataset.providerId as IProviderId;
        onClick(providerId);
    };

    return (
        <div className={classes['oauth-container']}>
            {(Object.keys(providers) as IProviderId[]).map((providerId) => (
                <Button
                    key={providerId}
                    className={classes['oauth-button']}
                    view={Buttons.OUTLINE}
                    onClick={clickHandler}
                    data-provider-id={providerId}
                    size={ButtonSizes.XL}
                >
                    <Icon className={classes['oauth-icon']} icon={icons[providerId]!} />
                    {titles[providerId]}
                </Button>
            ))}
        </div>
    );
};
