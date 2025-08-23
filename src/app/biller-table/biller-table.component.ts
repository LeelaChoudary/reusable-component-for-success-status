import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BillerRow } from '../modify-biller/modify-biller.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BillerService } from '../biller.service';

@Component({
  selector: 'app-biller-table',
  templateUrl: './biller-table.component.html',
  imports:[FormsModule,CommonModule]
})
export class BillerTableComponent {
  constructor(private router: Router,private billerService:BillerService) {}

  billerList: BillerRow[] = [
    {
      billerName: 'Electricity Board',
      customerId: 'CUST12345',
      location: 'Mumbai, Maharashtra',
      nickName: 'My EB',
      contact: '+919876543210',
      branch: 'Mumbai Main',
      currentAccount: '1234567890',
      currentBalance: 25000,
      autopayEnabled: true,
      autopayLimit: 10000
    },
    // ... more rows
  ];

  onEdit(row: BillerRow) {
    this.billerService.setBillerData(row);
    // navigate with router state
    this.router.navigate(['/modify-biller']);
  }
}
