import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent {

  type = input('text');
  label = input('input-label');

  controlName = input.required<string>();

  constructor(private formGroupDirective: FormGroupDirective) {}

  get control(): FormControl {
    return this.formGroupDirective.form.get(this.controlName()) as FormControl;
  }

  getErrorMessage(): string {
    if(this.control.hasError('required')) {
      return 'This field is required';
    }
    if(this.control.hasError('maxlength')) {
      return `Maximum length required is ${this.control.errors?.['maxlength'].requiredLength}`;
    }
    if(this.control.hasError('min')) {
      return `Minimum length required is ${this.control.errors?.['min'].min}`;
    }
    if(this.control.hasError('max')) {
      return `Maximum length required is ${this.control.errors?.['max'].max}`;
    }
    if(this.control.hasError('date')) {
      return this.control.errors?.['date'];
    }

    console.warn(`Input unknown error: ${this.control.errors}`);

    return '';
  }
}
