import { Component } from '@angular/core';
// import { DetailField } from '../detail-filed.interface';
import { CardHeaderData, DetailField } from '../transaction-status-card/transaction-status-card.component';
import { TransactionStatusCardComponent } from "../transaction-status-card/transaction-status-card.component";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  imports: [TransactionStatusCardComponent],
   styleUrls: ['./parent.component.css']
})
export class ParentComponent {

  cardHeaderData: CardHeaderData = {
  title: 'Scheduled Payment',
  subtitle: 'Submitted for Authorization',
  statusIcon: 'assets/icons/tick.png',
  statusBgColor: '#d4edda',
  rightLabel: 'Transaction ID',
  rightValue: 'TRX00009172810',
  rightSubtext: 'Processed on 25 July 2025'
};


  showDownload = true;
  showPrint = false;
  showMail = true;

  infoMessage = 'The transaction e-checks will automatically expire if no action is taken within 10 days.';
  showInfoMessage = true;



  
details: DetailField[] = [
  {
    label: 'Payment Type',
    value: 'Scheduled Later',
    labelValueStyle: 'rectangularbg',
    subtext: 'Will be paid on 20 May 2025, 9.20 AM'
  },
  {
    label: 'Authorization Status',
    value: 'PENDING',
    labelValueStyle: 'badge'
  },
  {
    label: 'Bank Name',
    value: 'Axis Bank'
  },
   {
    label: 'Payment Type',
    value: 'Scheduled Later',
    labelValueStyle: 'rectangularbg',
    subtext: 'Will be paid on 20 May 2025, 9.20 AM'
  },
  {
    label: 'Authorization Status',
    value: 'PENDING',
    labelValueStyle: 'badge'
  },
  {
    label: 'Bank Name',
    value: 'Axis Bank'
  }
];

}
