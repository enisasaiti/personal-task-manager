import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
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
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ], 
  encapsulation: ViewEncapsulation.None,
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
    taskRefreshSignal.update((v: number) => v + 1);

    this.title = '';
    this.dueDate = null;
    this.priority = 'Medium';
  }
}
