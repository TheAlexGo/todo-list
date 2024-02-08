import React, { type FC, type JSX } from 'react';

import { Icons } from '@components/Icon/Icon';

import { BasePicker } from '../BasePicker';

import type { IBasePicker, TTBasePickerProps } from '../BasePicker';

export interface ITimePicker extends IBasePicker {}

type TTimePickerProps = ITimePicker & TTBasePickerProps;

export const TimePicker: FC<TTimePickerProps> = ({ ...props }): JSX.Element => (
    <BasePicker {...props} type="time" icon={Icons.CLOCK} title="Выберите время" />
);
