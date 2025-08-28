import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillerService {
  private billerData: any = null;

  setBillerData(data: any) {
    this.billerData = data;
  }

  getBillerData() {
    return this.billerData;
  }

  clearBillerData() {
    this.billerData = null;
  }

  // This version includes customerId
  getInitialFormConfig(): Observable<any> {
    return of([
      {
        type: 'text',
        label: 'First Name',
        name: 'firstName',
        placeholder: 'Enter your first name',
        required: true
      },
      {
        type: 'select',
        label: 'Customer ID',
        name: 'customerId',
        options: [
          { key: '1', value: 'CUST 1' },
          { key: '2', value: 'CUST 2' }
        ]
      }
    ]);
  }
  // Example of what the API might return if the dependent field was businesslineid
  // getInitialFormConfig(): Observable<any> {
  //   return of([
  //     //... other fields
  //     {
  //       type: 'select',
  //       label: 'Business Line',
  //       name: 'businesslineid',
  //       options: [
  //         { key: '1', value: 'BUS 1' },
  //         { key: '2', value: 'BUS 2' }
  //       ]
  //     }
  //   ]);
  // }
  getDynamicFields(dependentName: string, dependentValue: any): Observable<any> {
    if (dependentName === 'customerId') {
      if (dependentValue === '1') {
        return of([{ type: 'text', label: 'Customer A Specific Field', name: 'customerAField' }]);
      } else if (dependentValue === '2') {
        return of([{ type: 'select', label: 'Customer B Option', name: 'customerBOption', options: [{ key: 'optX', value: 'Option X' }] }]);
      }
    } else if (dependentName === 'businesslineid') {
      if (dependentValue === '1') {
        return of([{ type: 'text', label: 'Retail Specific Field', name: 'retailField' }]);
      } else if (dependentValue === '2') {
        return of([{ type: 'select', label: 'Wholesale Option', name: 'wholesaleOption', options: [{ key: 'optA', value: 'Option A' }] }]);
      }
    }
    return of([]);
  }
}
