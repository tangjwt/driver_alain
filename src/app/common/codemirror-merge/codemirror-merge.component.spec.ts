import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodemirrorMergeComponent } from './codemirror-merge.component';

describe('CodemirrorMergeComponent', () => {
  let component: CodemirrorMergeComponent;
  let fixture: ComponentFixture<CodemirrorMergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodemirrorMergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodemirrorMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
