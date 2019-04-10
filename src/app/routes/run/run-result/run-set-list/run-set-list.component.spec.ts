import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunSetListComponent } from './run-set-list.component';

describe('RunSetListComponent', () => {
  let component: RunSetListComponent;
  let fixture: ComponentFixture<RunSetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunSetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunSetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
