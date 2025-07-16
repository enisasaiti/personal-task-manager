import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageKey = 'tasks';

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  getTasks(): Task[] {
    if (!this.isBrowser()) return [];
    const stored = localStorage.getItem(this.storageKey);
    const tasks = stored ? JSON.parse(stored) : [];

    // ✅ MIGRATION: convert any dueDate string to actual Date object
    return tasks.map((task: Task) => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined
    }));
  }

  addTask(task: Task): void {
    if (!this.isBrowser()) return;
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  deleteTask(id: number): void {
    if (!this.isBrowser()) return;
    const tasks = this.getTasks().filter(t => t.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  markAsDone(id: number): void {
    if (!this.isBrowser()) return;
    const tasks = this.getTasks().map(task =>
      task.id === id ? { ...task, status: 'Done' } : task
    );
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  updateTask(updatedTask: Task): void {
    if (!this.isBrowser()) return;
    const tasks = this.getTasks().map(task =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
