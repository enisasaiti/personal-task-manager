import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { taskRefreshSignal } from '../../signals/task-refresh.signal';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editingTaskId: number | null = null;
  editedTitle: string = '';
  editedDueDate?: Date | null = null;
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
      )
      .sort((a, b) => {
        const aTime = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bTime = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return aTime - bTime;
      });
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

  moveToInProgress(id: number): void {
    const updatedTasks = this.tasks.map(task =>
      task.id === id ? { ...task, status: 'In Progress' } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    this.loadTasks();
  }

  startEditing(task: Task): void {
    this.editingTaskId = task.id;
    this.editedTitle = task.title;
    this.editedDueDate = task.dueDate ? new Date(task.dueDate) : null;
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.editedTitle = '';
    this.editedDueDate = null;
  }

  saveEdit(task: Task): void {
    const updated: Task = {
      ...task,
      title: this.editedTitle,
      dueDate: this.editedDueDate || undefined
    };

    this.taskService.updateTask(updated);
    this.loadTasks();
    this.cancelEdit();
  }
  exportTasksToCSV(): void {
    this.taskService.exportCSV();
  }

  exportPDF(): void {
    this.taskService.exportPDF();
  }
}
