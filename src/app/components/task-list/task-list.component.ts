import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { taskRefreshSignal } from '../../signals/task-refresh.signal';

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
  searchTerm: string = '';
  priorityFilter: 'All' | 'Low' | 'Medium' | 'High' = 'All';

  constructor(private taskService: TaskService) {
    effect(() => {
      taskRefreshSignal();
      this.loadTasks();
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks
      .filter(task =>
        task.status === status &&
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.priorityFilter === 'All' || task.priority === this.priorityFilter)
      );
  }

  getRemainingTasksCount(): number {
    return this.tasks.filter(t => t.status !== 'Done').length;
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
