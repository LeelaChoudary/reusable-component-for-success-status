// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ApiService } from './api.service';
// import { forkJoin, merge, of } from 'rxjs';
// import { switchMap, filter } from 'rxjs/operators';

// interface FormField {
//   type: string;
//   label: string;
//   name: string;
//   placeholder?: string;
//   required?: boolean;
//   options?: { key: string; value: string; }[];
// }

// @Component({
//   selector: 'app-dynamic-form',
//   templateUrl: './dynamic-form.component.html',
//   styleUrls: ['./dynamic-form.component.css']
// })
// export class DynamicFormComponent implements OnInit {
//   dynamicForm: FormGroup;
//   initialFields: FormField[] = [];
//   dynamicFields: FormField[] = [];
  
//   // Define fields that can trigger the dependent API call
//   private dependentFieldNames = ['businesslineid', 'customerid'];

//   constructor(private fb: FormBuilder, private apiService: ApiService) {
//     this.dynamicForm = this.fb.group({
//       selectPaymentOption: [null, Validators.required]
//     });
//   }

//   ngOnInit() {
//     this.loadInitialData();
//   }

//   loadInitialData() {
//     // This assumes your first API call returns a full config
//     this.apiService.getInitialFormConfig().pipe(
//       tap(config => {
//         this.initialFields = config;
//         this.buildFormControls(config);
//       })
//     ).subscribe(() => this.setupDependentFields());
//   }

//   buildFormControls(fields: FormField[]) {
//     fields.forEach(field => {
//       const validators = field.required ? [Validators.required] : [];
//       this.dynamicForm.addControl(field.name, this.fb.control('', validators));
//     });
//   }
  
//   setupDependentFields() {
//     const dependentObservables = this.dependentFieldNames
//       .map(name => this.dynamicForm.get(name)?.valueChanges)
//       .filter(obs => obs !== null) as any[];

//     if (dependentObservables.length > 0) {
//       merge(...dependentObservables).pipe(
//         filter(value => !!value), // Only proceed if a value exists
//         switchMap(dependentValue => {
//           this.clearDynamicFields();
//           // Assuming a single parameter for the API call
//           return this.apiService.getDynamicFields(dependentValue);
//         })
//       ).subscribe(dynamicFields => {
//         this.dynamicFields = dynamicFields;
//         this.addDynamicFieldsToForm(dynamicFields);
//       });
//     }
//   }

//   clearDynamicFields() {
//     this.dynamicFields.forEach(field => {
//       this.dynamicForm.removeControl(field.name);
//     });
//     this.dynamicFields = [];
//   }

//   addDynamicFieldsToForm(fields: FormField[]) {
//     fields.forEach(field => {
//       const validators = field.required ? [Validators.required] : [];
//       this.dynamicForm.addControl(field.name, this.fb.control('', validators));
//     });
//   }

//   setPaymentOption(option: string) {
//     this.dynamicForm.get('selectPaymentOption')?.setValue(option);
//   }

//   onSubmit() {
//     console.log(this.dynamicForm.value);
//   }
// }
