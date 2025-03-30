import { Component, EventEmitter, input, Output } from '@angular/core';
import { Task } from '../../model/task.type';
import { NgClass } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { O } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-task',
  imports: [NgClass, ButtonComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  task = input.required<Task>();

  @Output() toggleCompleted = new EventEmitter<void>();
  @Output() deleteTask = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  get dueIn(): string {

    const dueDateInDays = this.task().dueInDays;

    if(dueDateInDays === 0) {
      return "Due today";
    }

    if(dueDateInDays === 1) {
      return "Due tomorrow";
    }

    if(dueDateInDays > 0 ) {
      return `Due in ${dueDateInDays} days`;
    }

    return "Overdue";
  }

  get priority() {
    const dueDateInDays = this.task().dueInDays;

    if(this.task().completedAt) {
      return null;
    }

    if(dueDateInDays <= 0) {
      return 'high';
    }

    if(dueDateInDays === 1) {
      return 'medium';
    }

    if(dueDateInDays > 0 ) {
      return "low";
    }

    return null;
  }

  confirmUndDialog() {

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Undo Task',
        message: 'Are you sure you want to UNDO this task?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.toggleCompleted.emit();
      }
    });
  }

  confirmDeleteDialog() {

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete Task',
        message: 'Are you sure you want to DELETE this task?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteTask.emit();
      }
    });
  }

  toggleTask() {
    if(this.task().editable) {

      if(this.task().completedAt) {
        this.confirmUndDialog();
      } else {
        this.toggleCompleted.emit();
      }
    }
  }

  handleDelete() {
    if(this.task().editable) {
      this.confirmDeleteDialog();
    }
  }
}
