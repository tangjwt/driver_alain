import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunSetDetailComponent } from './run-set-detail.component';

describe('RunSetDetailComponent', () => {
  let component: RunSetDetailComponent;
  let fixture: ComponentFixture<RunSetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunSetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunSetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
