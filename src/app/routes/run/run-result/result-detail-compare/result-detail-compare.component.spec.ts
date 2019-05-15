import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDetailCompareComponent } from './result-detail-compare.component';

describe('ResultDetailCompareComponent', () => {
  let component: ResultDetailCompareComponent;
  let fixture: ComponentFixture<ResultDetailCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultDetailCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDetailCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
