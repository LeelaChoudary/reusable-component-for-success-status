import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAccountDialogComponent } from './change-account-dialog.component';

describe('ChangeAccountDialogComponent', () => {
  let component: ChangeAccountDialogComponent;
  let fixture: ComponentFixture<ChangeAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeAccountDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
