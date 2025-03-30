export type Task = {
  id: string;
  summary: string;
  description: string;
  priority: number;
  editable: boolean;
  dueDate: string;
  dueInDays: number;
  completedAt?: string;
}

export type APITask = Omit<Task, 'dueInDays' | 'editable'>;
