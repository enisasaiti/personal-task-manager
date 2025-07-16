import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { taskRefreshSignal } from '../../signals/task-refresh.signal';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  title: string = '';
  dueDate?: string;
  priority: 'Low' | 'Medium' | 'High' = 'Medium';

  constructor(private taskService: TaskService) {}

  addTask(): void {
    if (!this.title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: this.title,
      dueDate: this.dueDate ? new Date(this.dueDate) : undefined,
      priority: this.priority,
      status: 'To Do'
    };

    this.taskService.addTask(newTask);
    taskRefreshSignal.update(v => v + 1);

    this.title = '';
    this.dueDate = '';
    this.priority = 'Medium';
  }
}
