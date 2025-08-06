import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormParentComponent } from './dynamic-form-parent.component';

describe('DynamicFormParentComponent', () => {
  let component: DynamicFormParentComponent;
  let fixture: ComponentFixture<DynamicFormParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormParentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
