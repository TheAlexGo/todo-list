import React, { FC, JSX } from 'react';

import { Icons } from '@components/Icon/Icon';
import { BasePicker, IBasePicker, TTBasePickerProps } from '../BasePicker';

export interface ITimePicker extends IBasePicker {}

type TTimePickerProps = ITimePicker & TTBasePickerProps;

export const TimePicker: FC<TTimePickerProps> = ({ ...props }): JSX.Element => {
    return <BasePicker {...props} type="time" icon={Icons.CLOCK} title="Выберите время" />;
};
