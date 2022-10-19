import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsDetalleComponent } from './logs-detalle.component';

describe('LogsDetalleComponent', () => {
  let component: LogsDetalleComponent;
  let fixture: ComponentFixture<LogsDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
