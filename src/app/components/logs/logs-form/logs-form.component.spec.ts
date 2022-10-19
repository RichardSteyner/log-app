import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsFormComponent } from './logs-form.component';

describe('LogsFormComponent', () => {
  let component: LogsFormComponent;
  let fixture: ComponentFixture<LogsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
