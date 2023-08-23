import React, { FC, JSX } from 'react';

import { Greetings } from '@components/Greetings/Greetings';
import { TaskCard } from '@components/TaskCard/TaskCard';

export const General: FC = (): JSX.Element => {
    return (
        <>
            <Greetings />
            <TaskCard
                id={window.crypto.randomUUID()}
                title="Сделать проект DayTask"
                date={new Date(Date.now())}
                progress={25}
            />
        </>
    );
};
