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

export interface Todo {
    title: string;
    completed: boolean;
    status: TodoStatus;
}
