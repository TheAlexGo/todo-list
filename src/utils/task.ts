import { type ITask } from '@types';

export const calculateCurrentPercentage = (task: ITask) => {
    const { subtasks } = task;
    const percentageForOneSubTask = 100 / subtasks.length;
    return subtasks.reduce((acc, { isCompleted }) => (isCompleted ? acc + percentageForOneSubTask : acc), 0);
};
