import { Injectable } from '@angular/core';

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
}
