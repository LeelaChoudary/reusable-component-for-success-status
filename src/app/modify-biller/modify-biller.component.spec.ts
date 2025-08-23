import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBillerComponent } from './modify-biller.component';

describe('ModifyBillerComponent', () => {
  let component: ModifyBillerComponent;
  let fixture: ComponentFixture<ModifyBillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyBillerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyBillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
