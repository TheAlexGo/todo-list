import React, { type FC, type JSX } from 'react';

import { Icons } from '@components/Icon/Icon';

import { BasePicker } from '../BasePicker';

import type { IBasePicker, TTBasePickerProps } from '../BasePicker';

export interface IDatePicker extends IBasePicker {}

type TDatePickerProps = IDatePicker & TTBasePickerProps;

export const DatePicker: FC<TDatePickerProps> = ({ ...props }): JSX.Element => (
    <BasePicker {...props} type="date" icon={Icons.CALENDAR} title="Выберите дату" />
);
