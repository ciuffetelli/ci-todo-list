import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from "../../components/form-input/form-input.component";
import { AlertComponent } from "../../components/alert/alert.component";
import { dateFromToday } from '../../../utils/dateFromToday';
import { ApiService } from '../../services/api.service';
import { catchError } from 'rxjs';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-create',
  imports: [ButtonComponent, ReactiveFormsModule, FormInputComponent, AlertComponent, LoadingComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  apiService = inject(ApiService);

  isLoading = signal(false);
  alert = signal({
    message: '',
    variations: 'info',
    display: false
  })

  createTaskForm: FormGroup = new FormGroup({
    summary: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    description: new FormControl('', []),
    priority: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(3)]),
    dueDate: new FormControl(this.initialDueDate, [Validators.required, dateFromToday()]),
  })

  get initialDueDate() {
    const today = new Date();
    const nextThreeDays = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    return nextThreeDays.toISOString().split('T')[0];
  }

  handleSubmit() {

    if(this.isLoading()) {

      this.alert.set({
        message: 'Please wait for the previous request to finish',
        variations: 'warning',
        display: true
      });

      return;
    }

    if(!this.createTaskForm.valid) {
      this.alert.set({
        message: 'Please check the form for errors',
        variations: 'danger',
        display: true
      });
      return;
    }

    const data = this.createTaskForm.value;

    this.isLoading.set(true);
    this.apiService.createTask(data)
      .pipe(
        catchError(error => {
          this.isLoading.set(false);
          this.alert.set({
            message: error.message,
            variations: 'danger',
            display: true
          });
          return [];
        })
      )
      .subscribe(task => {
        this.isLoading.set(false);
        this.alert.set({
          message: 'Task created successfully',
          variations: 'success',
          display: true
        });
        this.createTaskForm.reset();
      })

  }
}
