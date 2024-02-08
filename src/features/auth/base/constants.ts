import { ProviderId } from 'firebase/auth';

import { Icons } from '@components/Icon/Icon';

import type { ProviderIdUnion } from '@types';

type TOAuthProviderRecord<T> = Partial<Record<ProviderIdUnion, T>>;

export const OAuthProviderIcons: TOAuthProviderRecord<Icons> = {
    [ProviderId.GOOGLE]: Icons.GOOGLE,
    [ProviderId.GITHUB]: Icons.GITHUB,
};

export const OAuthProviderTitles: TOAuthProviderRecord<string> = {
    [ProviderId.GOOGLE]: 'Google',
    [ProviderId.GITHUB]: 'Github',
};
