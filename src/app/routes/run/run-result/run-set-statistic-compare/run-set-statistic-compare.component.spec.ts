import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunSetStatisticCompareComponent } from './run-set-statistic-compare.component';

describe('RunSetStatisticCompareComponent', () => {
  let component: RunSetStatisticCompareComponent;
  let fixture: ComponentFixture<RunSetStatisticCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunSetStatisticCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunSetStatisticCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
