import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyBillerComponent } from './verify-biller.component';

describe('VerifyBillerComponent', () => {
  let component: VerifyBillerComponent;
  let fixture: ComponentFixture<VerifyBillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyBillerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
