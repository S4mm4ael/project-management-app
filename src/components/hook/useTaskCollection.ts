import { useLocalStorage } from 'usehooks-ts';
import { ColumnType } from '../../utils/enums';
import { TaskModel } from '../../utils/models';

function useTaskCollection() {
  return useLocalStorage<{
    [key in ColumnType]: TaskModel[];
  }>('tasks', {
    Todo: [
      {
        id: '1',
        column: ColumnType.TO_DO,
        title: 'Task 1',
        color: 'blue.300',
      },
    ],
    'In Progress': [
      {
        id: '2',
        column: ColumnType.IN_PROGRESS,
        title: 'Task 2',
        color: 'yellow.300',
      },
    ],
    Blocked: [
      {
        id: '3',
        column: ColumnType.BLOCKED,
        title: 'Task 3',
        color: 'red.300',
      },
    ],
    Completed: [
      {
        id: '4',
        column: ColumnType.COMPLETED,
        title: 'Task 4',
        color: 'green.300',
      },
    ],
    t1: [
      {
        id: '5',
        column: ColumnType.t1,
        title: 'Task 5',
        color: 'gray.300',
      },
    ],
    t2: [
      {
        id: '6',
        column: ColumnType.t2,
        title: 'Task 6',
        color: 'red.300',
      },
    ],
    t3: [
      {
        id: '7',
        column: ColumnType.t3,
        title: 'Task 7',
        color: 'red.300',
      },
    ],
    t4: [
      {
        id: '8',
        column: ColumnType.t4,
        title: 'Task 8',
        color: 'red.300',
      },
    ],
    t5: [
      {
        id: '9',
        column: ColumnType.t5,
        title: 'Task 9',
        color: 'red.300',
      },
    ],
    t6: [
      {
        id: '10',
        column: ColumnType.t6,
        title: 'Task 10',
        color: 'red.300',
      },
    ],
  });
}

export default useTaskCollection;
