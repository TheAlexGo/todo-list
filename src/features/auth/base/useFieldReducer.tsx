import type { Reducer, ChangeEvent } from 'react';
import { useReducer } from 'react';

import type { Icons } from '@components/Icon/Icon';

import { Actions } from './types';

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
}

export const useFieldReducer = <TFieldProps extends object, TFieldElement extends HTMLElementWithValue>({
    title,
    icon,
}: IHook): [TFieldProps, TChangeCallback<TFieldElement>, TErrorCallback] => {
    const [fieldState, dispatchField] = useReducer<TReducer<TFieldProps>>(reducer, {
        id: window.crypto.randomUUID(),
        title,
        value: '',
        error: '',
        icon,
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
