import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { dataComponent } from './result-list.component';

describe('dataComponent', () => {
  let component: dataComponent;
  let fixture: ComponentFixture<dataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ dataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(dataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
