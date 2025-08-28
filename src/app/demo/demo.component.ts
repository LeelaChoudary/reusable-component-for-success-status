import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BillerService } from '../biller.service';
import { tap, switchMap, filter, map } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import { CommonModule } from '@angular/common';

interface FormField {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  options?: { key: string; value: string; }[];
}
// Add this interface to your component file
interface DependentField {
  name: string;
  value: any;
}
@Component({
  selector: 'app-demo-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './demo.component.html',
})
export class DemoComponent implements OnInit {
  dynamicForm: FormGroup;

  formConfig: FormField[] = []
  // formConfig: FormField[] = [
  //   {
  //     type: 'text',
  //     label: 'First Name',
  //     name: 'firstName',
  //     placeholder: 'Enter your first name',
  //     required: true
  //   },
  //   {
  //     type: 'text',
  //     label: 'Last Name',
  //     name: 'lastName',
  //     placeholder: 'Enter your last name'
  //   },
  //   {
  //     type: 'email',
  //     label: 'Email',
  //     name: 'email',
  //     required: true
  //   },
  //   // {
  //   //   type: 'select',
  //   //   label: 'Business Line',
  //   //   name: 'businesslineid',
  //   //   options: [
  //   //     { key: 'cust1', value: 'BUS 1' },
  //   //     { key: 'cust1', value: 'BUS 2' }
  //   //   ]
  //   // }
  //   {
  //     type: 'select',
  //     label: 'Customer ID',
  //     name: 'customerId',
  //     options: [
  //       { key: '1', value: 'CUST 1' },
  //       { key: '2', value: 'CUST 2' }
  //     ]
  //   }
  // ];
  staticFields: FormField[] = [
    {
      type: 'select',
      label: 'Remarks',
      name: 'remarks',
      options: [
        { key: 'rem1', value: 'Remark A' },
        { key: 'rem2', value: 'Remark B' }
      ]
    },
    {
      type: 'textarea',
      label: 'Remarks Description',
      name: 'remarksDescription',
      placeholder: 'Enter remarks description'
    }
  ];
  dynamicFields: FormField[] = [];
  showScheduleFields = false;
  // Define fields that can trigger the dependent API call
  private potentialDependentFieldNames = ['customerId', 'businesslineid'];
  constructor(private fb: FormBuilder, private apiService: BillerService) {
    // Set the default value for the payment option in the form group initialization
    this.dynamicForm = this.fb.group({
      selectPaymentOption: ['paynow', Validators.required]
    });
  }

  ngOnInit() {
    this.loadInitialFormConfig();
    // this.buildInitialForm();
    // this.setupDependentFields();
    this.dynamicForm.get('selectPaymentOption')?.valueChanges.subscribe(option => {
      this.showScheduleFields = option === 'schedulelater';
      this.updateScheduleFields(this.showScheduleFields);
    });
  }
  loadInitialFormConfig() {
    this.apiService.getInitialFormConfig().pipe(
      tap(config => {
        this.formConfig = config;
        this.buildInitialForm();
      })
    ).subscribe(() => {
      setTimeout(() => this.setupDependentFields(), 0);
    });
  }
  updateScheduleFields(show: boolean) {
    if (show) {
      this.dynamicForm.addControl('scheduleDate', this.fb.control('', Validators.required));
      this.dynamicForm.addControl('scheduleTime', this.fb.control('', Validators.required));
    } else {
      this.dynamicForm.removeControl('scheduleDate');
      this.dynamicForm.removeControl('scheduleTime');
    }
  }
  buildInitialForm() {
    [...this.formConfig, ...this.staticFields].forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      this.dynamicForm.addControl(field.name, this.fb.control('', validators));
    });

    // this.dynamicForm.get('businesslineid')?.valueChanges.pipe(
    //   switchMap(businessLineId => {
    //     // Clear old dynamic fields before fetching new ones
    //     this.clearDynamicFields();
    //     if (businessLineId) {
    //       // This simulates the second API call
    //       return this.apiService.getDynamicFields(businessLineId);
    //     } else {
    //       return of([]);
    //     }
    //   })
    // ).subscribe(dynamicFields => {
    //   this.dynamicFields = dynamicFields;
    //   this.addDynamicFieldsToForm(dynamicFields);
    // });
  }

  setupDependentFields() {
    // Filter to find which of the potential dependent fields actually exist
    const activeDependentFields = this.potentialDependentFieldNames
      .filter(name => this.formConfig.some(field => field.name === name));

    if (activeDependentFields.length === 0) {
      return;
    }

    const dependentObservables = activeDependentFields
      .map(name => this.dynamicForm.get(name)?.valueChanges.pipe(
        filter(value => !!value),
        map(value => ({ name, value }))
      ))
      .filter(obs => obs !== null) as any[];

    if (dependentObservables.length > 0) {
      merge(...dependentObservables).pipe(
        switchMap(dependent => {
          this.clearDynamicFields();
          // Type assertion to resolve the 'unknown' error
          const typedDependent = dependent as DependentField;
          return this.apiService.getDynamicFields(typedDependent.name, typedDependent.value);
        })
      ).subscribe(dynamicFields => {
        this.dynamicFields = dynamicFields;
        this.addDynamicFieldsToForm(dynamicFields);
      });
    }
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
 public setPaymentOption(option: string) {
    this.dynamicForm.get('selectPaymentOption')?.setValue(option);
  }
  onSubmit() {
    console.log(this.dynamicForm.value);
  }
}

