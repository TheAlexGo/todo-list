import React, { FC, JSX } from 'react';

import { Icons } from '@components/Icon/Icon';
import { Input } from '@components/Input/Input';

export const App: FC = (): JSX.Element => {
    return (
        <div>
            <Input type="email" title="Email" icon={Icons.UserTag} />
            <Input type="password" title="Password" icon={Icons.Lock} />
        </div>
    );
};
