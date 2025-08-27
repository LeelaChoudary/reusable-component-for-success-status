import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormsSampleAppComponent } from './dynamic-forms-sample-app.component';

describe('DynamicFormsSampleAppComponent', () => {
  let component: DynamicFormsSampleAppComponent;
  let fixture: ComponentFixture<DynamicFormsSampleAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormsSampleAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormsSampleAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
