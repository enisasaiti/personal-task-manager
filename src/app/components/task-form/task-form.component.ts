import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { taskRefreshSignal } from '../../signals/task-refresh.signal';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  title: string = '';
  dueDate?: Date | null = null;
  priority: 'Low' | 'Medium' | 'High' = 'Medium';

  constructor(private taskService: TaskService) {}

  addTask(): void {
    if (!this.title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: this.title,
      dueDate: this.dueDate || undefined,
      priority: this.priority,
      status: 'To Do'
    };

    this.taskService.addTask(newTask);
    taskRefreshSignal.update(v => v + 1);

    this.title = '';
    this.dueDate = null;
    this.priority = 'Medium';
  }
}
