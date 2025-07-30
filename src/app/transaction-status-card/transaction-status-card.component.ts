import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface DetailField {
  label: string;
  value: string;
  valueBgColor?: string;
  valueTextColor?: string;
  valueIsBadge?: boolean;
  subtext?: string;
  subtextBgColor?: string;
  subtextTextColor?: string;
  badgeStyle?: boolean;
  badgeClass?: string;
}

@Component({
  selector: 'app-transaction-status-card',
  templateUrl: './transaction-status-card.component.html',
  imports:[FormsModule,CommonModule],
  styleUrls: ['./transaction-status-card.component.css']
})
export class TransactionStatusCardComponent {
  @Input() statusTitle: string = '';
  @Input() statusSubtitle: string = '';
  @Input() tickIconPath: string = 'assets/icons/tick.png';
  @Input() statusBgColor:string='';

  @Input() rightMetaLabel?: string;
  @Input() rightMetaValue?: string;
  @Input() rightMetaSubtext?: string;

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