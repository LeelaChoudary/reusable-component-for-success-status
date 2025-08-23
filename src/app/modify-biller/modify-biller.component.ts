import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeAccountDialogComponent } from "../change-account-dialog/change-account-dialog.component";
import { BillerService } from '../biller.service';

export interface BillerRow {
  billerName: string;
  customerId: string;
  location: string;
  nickName: string;
  contact: string;
  branch: string;
  currentAccount: string;
  currentBalance: number;
  autopayEnabled?: boolean;
  autopayLimit?: number | null;
}

@Component({
  selector: 'app-modify-biller',
  templateUrl: './modify-biller.component.html',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ChangeAccountDialogComponent],
  styleUrls: ['./modify-biller.component.css']
})
export class ModifyBillerComponent implements OnInit, OnChanges {
  @Input() selectedRow!: BillerRow;

  form!: FormGroup;
showChangeAccount = false;


  locationOptions = [
    'Chennai, Tamil Nadu',
    'Mumbai, Maharashtra',
    'Delhi, Delhi',
    'Bengaluru, Karnataka',
    'Hyderabad, Telangana',
    'Kolkata, West Bengal'
  ];

  constructor(private fb: FormBuilder, private router: Router,private billerService: BillerService) {
  // receive the row data from Router state
  // const nav = this.router.getCurrentNavigation();
  // this.selectedRow = nav?.extras.state?.['selectedRow'];
     // Restore data if already set (when coming back from Verify)
    const savedData = this.billerService.getBillerData();
    if (savedData) {
      this.selectedRow = savedData;
    }
}

  ngOnInit(): void {
    this.buildForm();
    if (this.selectedRow) 
      this.patchFromRow(this.selectedRow);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRow'] && this.form) {
      this.patchFromRow(changes['selectedRow'].currentValue);
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      customerId: ['', [Validators.required, Validators.maxLength(20)]],
      nickName: ['', [Validators.required, Validators.maxLength(20)]],
      contact: ['', [Validators.required, this.phoneDigitsLength(12, 13)]],
      location: [null, Validators.required],
      autopayEnabled: [false],
      autopayLimit: [{ value: null, disabled: true }, [Validators.min(1)]],
    });

    this.form.get('autopayEnabled')!.valueChanges.subscribe((enabled: boolean) => {
      const limit = this.form.get('autopayLimit')!;
      if (enabled) {
        limit.enable();
        limit.addValidators([Validators.required, Validators.min(1)]);
      } else {
        limit.clearValidators();
        limit.setValue(null);
        limit.disable();
      }
      limit.updateValueAndValidity();
    });
  }

  private patchFromRow(row: BillerRow): void {
    this.form.patchValue({
      customerId: row.customerId ?? '',
      nickName: row.nickName ?? '',
      contact: row.contact ?? '',
      location: row.location ?? null,
      autopayEnabled: !!row.autopayEnabled,
      autopayLimit: row.autopayEnabled ? row.autopayLimit ?? null : null
    });
  }

  private phoneDigitsLength(min: number, max: number): ValidatorFn {
    return (control: AbstractControl) => {
      const raw = (control.value ?? '').toString();
      if (!raw) return null;
      const digits = raw.replace(/[^\d]/g, '');
      if (digits.length < min || digits.length > max) {
        return { phoneLength: { requiredMin: min, requiredMax: max, actual: digits.length } };
      }
      return null;
    };
  }

  get f() {
    return this.form.controls;
  }

  isInvalid(ctrl: string) {
    const c = this.form.get(ctrl)!;
    return c.invalid && (c.dirty || c.touched);
  }

 openChangeAccount(): void {
  this.showChangeAccount = true;
}
onAccountSelected(account: any) {
  // update selectedRow with new account details
  this.selectedRow = {
    ...this.selectedRow,
    branch: account.branch,
    currentAccount: account.currentAccount,
    currentBalance: account.currentBalance,
    autopayEnabled: account.autopayEnabled,
    autopayLimit: account.autopayLimit
  };

  // also patch form autopay fields
  this.form.patchValue({
    autopayEnabled: account.autopayEnabled,
    autopayLimit: account.autopayLimit
  });
   this.showChangeAccount = false;
}

onDialogClosed() {
  this.showChangeAccount = false;
}
  onCancel(): void {
    // simply navigate back to biller list/dashboard
    this.router.navigate(['/biller-table']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // prepare payload to send to Verify screen
    const payload = {
      ...this.selectedRow,
      ...this.form.value
    };
 this.billerService.setBillerData(payload);
    this.router.navigate(['/verify-biller']);
  }
}
