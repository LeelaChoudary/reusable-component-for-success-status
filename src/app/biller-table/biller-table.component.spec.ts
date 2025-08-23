import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillerTableComponent } from './biller-table.component';

describe('BillerTableComponent', () => {
  let component: BillerTableComponent;
  let fixture: ComponentFixture<BillerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
