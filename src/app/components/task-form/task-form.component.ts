import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

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
    console.log("added")
    if (!this.title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: this.title,
      dueDate: this.dueDate ? new Date(this.dueDate) : undefined,
      status: 'To Do'
    };

    this.taskService.addTask(newTask);
    this.title = '';
    this.dueDate = '';
  }
}
