import type { ISubTask } from '@types';

export const calculateCurrentPercentage = (subTasks: ISubTask[]) => {
    const percentageForOneSubTask = 100 / subTasks.length;
    return subTasks.reduce((acc, { isCompleted }) => (isCompleted ? acc + percentageForOneSubTask : acc), 0);
};

export const getCurrentDateText = (date: string): string =>
    new Date(date).toLocaleDateString('ru', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
