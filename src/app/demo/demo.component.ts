import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BillerService } from '../biller.service';
import { tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

interface FormField {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  options?: { key: string; value: string; }[];
}

@Component({
  selector: 'app-demo-form',
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './demo.component.html',
})
export class DemoComponent implements OnInit {
  dynamicForm: FormGroup;
  formConfig: FormField[] = [
    {
      type: 'text',
      label: 'First Name',
      name: 'firstName',
      placeholder: 'Enter your first name',
      required: true
    },
    {
      type: 'text',
      label: 'Last Name',
      name: 'lastName',
      placeholder: 'Enter your last name'
    },
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      required: true
    },
    {
      type: 'select',
      label: 'Business Line',
      name: 'businesslineid',
      options: [
        { key: '1', value: 'abc' },
        { key: '2', value: 'cde' }
      ]
    }
  ];
  
  dynamicFields: FormField[] = [];
  
  constructor(private fb: FormBuilder, private apiService: BillerService) {
    this.dynamicForm = this.fb.group({});
  }

  ngOnInit() {
    this.buildInitialForm();
  }

  buildInitialForm() {
    this.formConfig.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      this.dynamicForm.addControl(field.name, this.fb.control('', validators));
    });

    this.dynamicForm.get('businesslineid')?.valueChanges.pipe(
      switchMap(businessLineId => {
        // Clear old dynamic fields before fetching new ones
        this.clearDynamicFields();
        if (businessLineId) {
          // This simulates the second API call
          return this.apiService.getDynamicFields(businessLineId);
        } else {
          return of([]);
        }
      })
    ).subscribe(dynamicFields => {
      this.dynamicFields = dynamicFields;
      this.addDynamicFieldsToForm(dynamicFields);
    });
  }
  
  // Method to remove the previous set of dynamic fields
  clearDynamicFields() {
    this.dynamicFields.forEach(field => {
      this.dynamicForm.removeControl(field.name);
    });
    this.dynamicFields = [];
  }

  // Method to add new dynamic fields from the second API call
  addDynamicFieldsToForm(fields: FormField[]) {
    fields.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      this.dynamicForm.addControl(field.name, this.fb.control('', validators));
    });
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
  }
}

