import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface DetailField {
  label: string;
  value: string;
  subtext?: string;

  labelValueStyle?: 'badge' | 'rectangularbg'; // Controls style of value
}



export interface CardHeaderData {
  title: string;
  subtitle?: string;
  statusIcon?: string;
  statusBgColor?: string;

  rightLabel?: string;
  rightValue?: string;
  rightSubtext?: string;
}
@Component({
  selector: 'app-transaction-status-card',
  templateUrl: './transaction-status-card.component.html',
  imports:[FormsModule,CommonModule],
  styleUrls: ['./transaction-status-card.component.css']
})
export class TransactionStatusCardComponent {
  @Input() cardHeaderData!: CardHeaderData;



  @Input() details: DetailField[] = [];

  @Input() showPrintIcon: boolean = true;
  @Input() showDownloadIcon: boolean = false;
  @Input() showMailIcon: boolean = false;

  @Input() infoMessage?: string;
  @Input() showInfoMessage:boolean=false;
  @Input() infoIconPath: string = 'assets/icons/info.png';

  @Output() downloadClicked = new EventEmitter<void>();
  @Output() mailClicked = new EventEmitter<void>();
  @Output() printClicked = new EventEmitter<void>();

  onDownload() {
    this.downloadClicked.emit();
  }

  onMail() {
    this.mailClicked.emit();
  }

  onPrint() {
    this.printClicked.emit();
  }
}