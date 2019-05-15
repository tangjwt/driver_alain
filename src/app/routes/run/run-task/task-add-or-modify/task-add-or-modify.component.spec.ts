import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAddOrModifyComponent } from './task-add-or-modify.component';

describe('TaskAddOrModifyComponent', () => {
  let component: TaskAddOrModifyComponent;
  let fixture: ComponentFixture<TaskAddOrModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskAddOrModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAddOrModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
