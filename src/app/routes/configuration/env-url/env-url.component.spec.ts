import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvUrlComponent } from './env-url.component';

describe('EnvUrlComponent', () => {
  let component: EnvUrlComponent;
  let fixture: ComponentFixture<EnvUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
