/* eslint-disable no-console, @typescript-eslint/no-explicit-any */

import { isDevelopment } from '@utils/app';

export class Logger {
    public static error(error: Error) {
        console.error('An error occurred while executing the script:', error);
    }

    public static info(...messages: any[]) {
        console.log(...messages);
    }

    public static debug(...messages: any[]) {
        if (isDevelopment) {
            console.log(...messages);
        }
    }
}
