import { useReducer } from 'react';
import type { Reducer, ChangeEvent } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Actions } from './types';

import type { Icons } from '@components/Icon/Icon';

type TReducer<TFieldProps extends object> = Reducer<TFieldProps, IAction>;

type HTMLElementWithValue = HTMLElement & { value: string };

type TChangeCallback<TFieldElement extends HTMLElementWithValue> = (e: ChangeEvent<TFieldElement>) => void;
type TErrorCallback = (error: string) => void;

interface IAction {
    type: Actions;
    value: string;
}

const reducer = <TFieldProps extends object>(state: TFieldProps, { type, value }: IAction) => {
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

interface IHook {
    title?: string;
    icon?: Icons;
    value?: string;
}

export const useFieldReducer = <TFieldProps extends object, TFieldElement extends HTMLElementWithValue>({
    title,
    icon,
    value,
}: IHook): [TFieldProps, TChangeCallback<TFieldElement>, TErrorCallback] => {
    const [fieldState, dispatchField] = useReducer<TReducer<TFieldProps>>(reducer, {
        id: uuidv4(),
        title,
        icon,
        value: value || '',
        error: '',
    } as TFieldProps);

    const changeFieldHandler = (e: ChangeEvent<TFieldElement>) => {
        dispatchField({
            type: Actions.CHANGE,
            value: e.target.value,
        });
    };

    const errorFieldHandler = (error: string) => {
        dispatchField({
            type: Actions.ERROR,
            value: error,
        });
    };

    return [fieldState, changeFieldHandler, errorFieldHandler];
};
