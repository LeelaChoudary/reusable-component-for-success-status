import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

export interface BankAccount {
  branch: string;
  currentAccount: string;
  currentBalance: number;
  autopayEnabled: boolean;
  autopayLimit: number | null;
}

@Component({
  selector: 'app-change-account-dialog',
  templateUrl: './change-account-dialog.component.html',
  imports:[CommonModule],
  styleUrls: ['./change-account-dialog.component.css']
})
export class ChangeAccountDialogComponent {
  @Output() accountSelected = new EventEmitter<BankAccount>();
  @Output() closed = new EventEmitter<void>();

  // Dummy list (replace later with API response)
  accounts: BankAccount[] = [
    { branch: 'Mumbai Main', currentAccount: '1234567890', currentBalance: 25000, autopayEnabled: true, autopayLimit: 10000 },
    { branch: 'Delhi Branch', currentAccount: '9876543210', currentBalance: 15000, autopayEnabled: false, autopayLimit: null },
    { branch: 'Chennai Branch', currentAccount: '5556667777', currentBalance: 40000, autopayEnabled: true, autopayLimit: 20000 }
  ];

  selectedAccount!: BankAccount;

  selectAccount(account: BankAccount) {
    this.selectedAccount = account;
  }

  confirmSelection() {
    if (this.selectedAccount) {
      this.accountSelected.emit(this.selectedAccount);
    }
  }

  closeDialog() {
    this.closed.emit();
  }
}
