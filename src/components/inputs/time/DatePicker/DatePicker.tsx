import React, { FC, JSX } from 'react';

import { Icons } from '@components/Icon/Icon';
import { BasePicker, IBasePicker, TTBasePickerProps } from '../BasePicker';

export interface IDatePicker extends IBasePicker {}

type TDatePickerProps = IDatePicker & TTBasePickerProps;

export const DatePicker: FC<TDatePickerProps> = ({ ...props }): JSX.Element => {
    return <BasePicker {...props} type="date" icon={Icons.CALENDAR} />;
};
