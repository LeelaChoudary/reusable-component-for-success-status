import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent {
@Input() config: businessToDynamicFieldInterface[] = [];
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.config.forEach(field => {
      this.form.addControl(field.param, new FormControl(''));
    });
  }
   onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}

export interface businessToDynamicFieldInterface {
  param: string;
  labelField: string;
  labelType: string; // 'text' | 'dropdown' | 'radio'
  labelValue?: { label: string; value: string }[];
  displayOrder?: string;
  key_refiner?: string;
  maxLength?: number;
  format?: string;
  fieldSize?: number;
  errorMessage?: string;
}

