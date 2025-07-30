import { Component } from '@angular/core';
// import { DetailField } from '../detail-filed.interface';
import { DetailField } from '../transaction-status-card/transaction-status-card.component';
import { TransactionStatusCardComponent } from "../transaction-status-card/transaction-status-card.component";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  imports: [TransactionStatusCardComponent],
   styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  cardTitle = 'Scheduled Payment';
  cardSubtitle = 'Submitted for Authorization';

  statusIconPath = 'assets/icons/tick.png';
  statusBgColor = '#d4edda'; // Light green

  showDownload = true;
  showPrint = false;
  showMail = true;

  infoMessage = 'The transaction e-checks will automatically expire if no action is taken within 10 days.';
  showInfoMessage = true;

  metaLabel = 'Transaction ID';
  metaValue = 'TRX00009172810';
  metaSubtext = 'Processed on 25 July 2025';

  details: DetailField[] = [
    {
      label: 'Payment Type',
      value: 'Scheduled Later',
      valueIsBadge: true,
      valueBgColor: '#fcefc0',
      valueTextColor: '#a67c00',
      subtext: 'Will be paid on 20 May 2025, 9.20 AM'
    },
    {
      label: 'Authorization Status',
      value: 'PENDING',
      badgeStyle: true,
      badgeClass: 'pending'
    },
    {
      label: 'Bank Name',
      value: 'Axis Bank'
    }
  ];
}
