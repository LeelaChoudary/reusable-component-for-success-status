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

    getDynamicFields(businesslineid: string): Observable<any> {
    if (businesslineid === '1') {
      return of([
        { type: 'text', label: 'Retail Specific Field', name: 'retailField' },
        { type: 'select', label: 'Retail Option', name: 'retailOption', options: [{ key: '10', value: 'A' }, { key: '20', value: 'B' }] }
      ]);
    } else if (businesslineid === '2') {
      return of([
        { type: 'text', label: 'Wholesale Specific Field', name: 'wholesaleField' },
        { type: 'text', label: 'Wholesale Field 2', name: 'wholesaleField2' }
      ]);
    }
    return of([]);
  }
}
