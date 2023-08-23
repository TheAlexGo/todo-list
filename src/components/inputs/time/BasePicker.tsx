import React, { FC, InputHTMLAttributes, JSX } from 'react';

import { IInput } from '@components/inputs/Input/Input';
import { Icon, Icons } from '@components/Icon/Icon';

import classes from './BasePicker.module.scss';
import baseClasses from '../Base.module.scss';

type TInput = InputHTMLAttributes<HTMLInputElement>;

export interface IBasePicker extends Omit<IInput, 'onChange'> {
    icon: Icons;
    onChange: TInput['onChange'];
    type: 'date' | 'time';
    labelId?: string;
}

export type TTBasePickerProps = IBasePicker & TInput;

export const BasePicker: FC<TTBasePickerProps> = ({ icon, error, labelId, ...props }): JSX.Element => {
    return (
        <label className={classes['wrapper']} htmlFor={labelId}>
            <div className={classes['container-content']}>
                <div className={classes['wrapper-icon']}>
                    <Icon icon={icon} size={24} />
                </div>
                <input {...props} className={classes['field']} />
            </div>
            {error && <strong className={baseClasses['error']}>{error}</strong>}
        </label>
    );
};
