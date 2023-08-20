import { FC, SVGProps } from 'react';

export type TSvgComponent = FC<SVGProps<SVGSVGElement>>;

export enum Pages {
    INDEX = '/',
    LOGIN = '/login',
}
