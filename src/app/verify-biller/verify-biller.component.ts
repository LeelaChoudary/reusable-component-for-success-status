import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BillerService } from '../biller.service';

@Component({
  selector: 'app-verify-biller-details',
  templateUrl: './verify-biller.component.html',
  imports:[FormsModule,CommonModule],
  styleUrls: ['./verify-biller.component.css']
})
export class VerifyBillerDetailsComponent {
  billerDetails: any;
  isConfirmed = false;

constructor(private router: Router, private billerService: BillerService) {
    // Get data from service
    this.billerDetails = this.billerService.getBillerData();
  }
  onCancel() {
    this.router.navigate(['/modify-biller']);
  }

  onConfirm() {
    if (this.isConfirmed) {
      this.router.navigate(['/otp-verification'], {
        state: { billerDetails: this.billerDetails }
      });
    }
  }
}
