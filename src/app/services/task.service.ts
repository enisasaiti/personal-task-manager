import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

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

  exportCSV(): void {
    const tasks = this.getTasks();
    if (!tasks.length) return;

    const header = ['ID', 'Title', 'Due Date', 'Priority', 'Status'];
    const rows = tasks.map(task => [
      task.id,
      `"${task.title}"`,
      task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '',
      task.priority ?? '',
      task.status
    ]);

    const csvContent = [header, ...rows]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tasks-export.csv';
    link.click();
  }

  exportPDF(): void {
    const tasks = this.getTasks();
    if (!tasks.length) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Task Export', 14, 15);

    autoTable(doc, {
      head: [['ID', 'Title', 'Due Date', 'Priority', 'Status']],
      body: tasks.map(task => [
        task.id,
        task.title,
        task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '',
        task.priority ?? '',
        task.status
      ]),
      startY: 25
    });

    doc.save('tasks-export.pdf');
  }

}