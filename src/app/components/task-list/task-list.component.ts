import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editingTaskId: number | null = null;
  editedTitle: string = '';
  editedDueDate?: string;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  markAsDone(id: number): void {
    this.taskService.markAsDone(id);
    this.loadTasks();
  }

  startEditing(task: Task): void {
    this.editingTaskId = task.id;
    this.editedTitle = task.title;
    this.editedDueDate = task.dueDate
      ? new Date(task.dueDate).toISOString().substring(0, 10)
      : '';
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.editedTitle = '';
    this.editedDueDate = '';
  }

  saveEdit(task: Task): void {
    const updated: Task = {
      ...task,
      title: this.editedTitle,
      dueDate: this.editedDueDate ? new Date(this.editedDueDate) : undefined
    };

    this.taskService.updateTask(updated);
    this.loadTasks();
    this.cancelEdit();
  }
}
