import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { taskRefreshSignal } from '../../signals/task-refresh.signal';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  title: string = '';
  dueDate?: string;

  constructor(private taskService: TaskService) {}

  addTask(): void {
    if (!this.title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: this.title,
      dueDate: this.dueDate ? new Date(this.dueDate) : undefined,
      status: 'To Do'
    };

    this.taskService.addTask(newTask);
    taskRefreshSignal.update(v => v + 1); // Trigger refresh in TaskList

    this.title = '';
    this.dueDate = '';
  }
}
