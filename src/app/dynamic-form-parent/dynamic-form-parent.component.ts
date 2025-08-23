import { Component } from '@angular/core';
import { businessToDynamicFieldInterface, DynamicFormComponent } from "../dynamic-form/dynamic-form.component";

@Component({
  selector: 'app-dynamic-form-parent',
  imports: [DynamicFormComponent],
  templateUrl: './dynamic-form-parent.component.html',
  styleUrl: './dynamic-form-parent.component.css'
})
export class DynamicFormParentComponent {
  formFields: businessToDynamicFieldInterface[] = [
    {
      param: 'biller',
      labelField: 'Select Biller',
      labelType: 'dropdown',
      labelValue: [
        { label: 'Airtel Teleco', value: 'airtel' },
        { label: 'BSNL', value: 'bsnl' }
      ]
    },
    {
      param: 'location',
      labelField: 'Select Location',
      labelType: 'dropdown',
      labelValue: [
        { label: 'Mumbai', value: 'mumbai' },
        { label: 'Delhi', value: 'delhi' }
      ]
    },
    {
      param: 'customerId',
      labelField: 'Customer ID',
      labelType: 'text'
    },
    {
      param: 'nickName1',
      labelField: 'Nick Name (Optional)',
      labelType: 'text'
    },
    {
      param: 'phoneNumber',
      labelField: 'Phone Number',
      labelType: 'text'
    },
    {
      param: 'billOption',
      labelField: 'With Bill / Without Bill',
      labelType: 'radio',
      labelValue: [
        { label: 'With Bill', value: 'with' },
        { label: 'Without Bill', value: 'without' }
      ]
    },
    
  ];

  onFormSubmit(data: any): void {
    console.log('Submitted Form Data:', data);
  }
}


