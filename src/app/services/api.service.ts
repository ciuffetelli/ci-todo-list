import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APITask } from '../model/task.type';
import { catchError, delay, throwError, timeout } from 'rxjs';

const API_URL = 'http://localhost:3333';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);
  getTasks() {
    return this.http.get<APITask[]>(`${API_URL}/tasks`)
      .pipe( delay(2000) )
      .pipe(
        timeout(5000),
        catchError(error => {
          return throwError(() => new Error('The API is taking a long time to respond. Please check the services.'))
        }
      )
    )
  }
  getTaskById(taskId: string) {
    return this.http.get<APITask>(`${API_URL}/tasks/${taskId}`)
      .pipe( delay(2000) )
      .pipe(
        timeout(5000),
        catchError(error => {

          if(error.status === 404) {
            return throwError(() => new Error('Task not found'))
          }

          return throwError(() => new Error('The API is taking a long time to respond. Please check the services.'))
        }
      )
    )
  }
  createTask(task: APITask) {
    return this.http.post(`${API_URL}/tasks`, task)
      .pipe( delay(2000) )
      .pipe(
        timeout(5000),
        catchError(error => {
          return throwError(() => new Error('The API is taking a long time to respond. Please check the services.'))
        }
      )
    )
  }
  updateTask(task: APITask) {
    return this.http.put(`${API_URL}/tasks/${task.id}`, task)
      .pipe( delay(2000) )
      .pipe(
        timeout(5000),
        catchError(error => {
          return throwError(() => new Error('The API is taking a long time to respond. Please check the services.'))
        }
      )
    )
  }
  deleteTask(taskId: string) {
    return this.http.delete(`${API_URL}/tasks/${taskId}`)
      .pipe( delay(2000) )
      .pipe(
        timeout(5000),
        catchError(error => {
          return throwError(() => new Error('The API is taking a long time to respond. Please check the services.'))
        }
      )
    )
  }
}
