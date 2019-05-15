import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunSetStatisticComponent } from './run-set-statistic.component';

describe('RunSetStatisticComponent', () => {
  let component: RunSetStatisticComponent;
  let fixture: ComponentFixture<RunSetStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunSetStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunSetStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
