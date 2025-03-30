import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskComponent } from "../../components/task/task.component";
import { ButtonComponent } from "../../components/button/button.component";
import { RouterLink } from '@angular/router';
import { Task } from '../../model/task.type';
import { catchError } from 'rxjs';
import { LoadingComponent } from "../../components/loading/loading.component";
import { ApiService } from '../../services/api.service';
import { AlertComponent } from "../../components/alert/alert.component";

@Component({
  selector: 'app-home',
  imports: [TaskComponent, ButtonComponent, RouterLink, LoadingComponent, AlertComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  apiService = inject(ApiService);

  isLoading = signal(true);
  error = signal<string | null>(null);
  alert = signal({
    message: '',
    variations: 'info',
    display: false
  })
  tasks = signal<Task[]>([]);

  get sortedTasks() {
    return Array.from(this.tasks()).sort((a, b) => {

      const dtCompletedA = a.completedAt ? new Date(a.completedAt).getTime() : null;
      const dtCompletedB = b.completedAt ? new Date(b.completedAt).getTime() : null;

      if(dtCompletedA && !dtCompletedB) {
        return 1;
      } else if(!dtCompletedA && dtCompletedB) {
        return -1;
      } else if(dtCompletedA && dtCompletedB) {
        return dtCompletedB - dtCompletedA;
      }

      if(a.dueInDays <= 1 || b.dueInDays <= 1) {

        const priorityA = a.priority - a.dueInDays;
        const priorityB = b.priority - b.dueInDays;

        return priorityB - priorityA;
      }

      return b.priority - a.priority
    });
  }

  toggleCompleted({ id, summary, description, priority, dueDate, completedAt }: Task) {
    const newList: Task[] = Array.from(this.tasks()).map(item => {
      if(item.id === id) {
        return {
          ...item,
          completedAt: item.completedAt ? undefined : new Date().toISOString()
        }
      }
      return item;
    });

    this.isLoading.set(true);
    this.tasks.set(newList);

    this.apiService.updateTask({
      id,
      summary,
      description,
      priority,
      dueDate,
      completedAt: completedAt ? undefined : new Date().toISOString()
    })
    .pipe(
      catchError(error => {
        this.error.set(error.message);
        this.isLoading.set(false);
        return [];
      })
    )
    .subscribe(result => {
      this.isLoading.set(false);
    });
  };

  deleteTask({ id, editable}: Task) {
    if(editable) {
      this.isLoading.set(true);
      this.tasks.set(this.tasks().filter(item => item.id !== id));
      this.apiService.deleteTask(id)
      .pipe(
          catchError(error => {
            this.error.set(error.message);
            this.isLoading.set(false);
            return [];
          })
        )
        .subscribe(result => {
          this.isLoading.set(false);
        });
    }
  }

  ngOnInit() {
    this.apiService.getTasks()
      .pipe(
        catchError(error => {
          this.error.set(error.message);
          this.isLoading.set(false);
          return [];
        })
      )
      .subscribe(result => {

        const tasks = result.map(item => {
          const isEditable = !item.completedAt;

          const dtDueDate = new Date(item.dueDate ?? '');
          dtDueDate.setHours(0, 0, 0, 0);

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const dueDateInDays = Math.floor((dtDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

          return {
            ...item,
            dueInDays: dueDateInDays,
            editable: isEditable
          }
        });

        this.tasks.set(tasks);
        this.isLoading.set(false);
      })
  }
}
