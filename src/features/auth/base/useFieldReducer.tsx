import { useReducer, Reducer, ChangeEvent, Dispatch } from 'react';

import { Icons } from '@components/Icon/Icon';
import { IInput } from '@components/Input/Input';
import { Actions } from './types';

type TReducer = Reducer<IInput, IAction>;

type TChangeCallback = (e: ChangeEvent<HTMLInputElement>) => void;

interface IAction {
    type: Actions;
    value: string;
}

const reducer = (state: IInput, { type, value }: IAction) => {
    switch (type) {
        case Actions.CHANGE:
            return {
                ...state,
                value,
                error: '',
            };
        case Actions.ERROR:
            return {
                ...state,
                error: value,
            };
        default:
            return state;
    }
};

export const useFieldReducer = (title: string, icon: Icons): [IInput, Dispatch<IAction>, TChangeCallback] => {
    const [fieldState, dispatchField] = useReducer<TReducer>(reducer, {
        title: title,
        value: '',
        error: '',
        icon: icon,
    });

    const changeFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatchField({
            type: Actions.CHANGE,
            value: e.target.value,
        });
    };

    return [fieldState, dispatchField, changeFieldHandler];
};
