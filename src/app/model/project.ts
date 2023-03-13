export interface Employees {
  employeeName: string;
  age: number;
  department: string;
  date: number;
  gender: string;
  salary: number;
  bio: string;
}

export enum BtnState {
  loaded =  1,
  loading,
  loadedAndDelaying,
  error
}

export enum TodoStatus {
  completed = 'completed',
  inProgress = 'in-progress'
}

export interface ExternalTodo {
    title: string;
    completed: boolean;
    status: TodoStatus;
}
export class Todo {
    id: number = 0;
    todo_name: string = '';
}
