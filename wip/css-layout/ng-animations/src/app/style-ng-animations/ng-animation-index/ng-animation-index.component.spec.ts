import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAnimationIndexComponent } from './ng-animation-index.component';

describe('NgAnimationIndexComponent', () => {
  let component: NgAnimationIndexComponent;
  let fixture: ComponentFixture<NgAnimationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgAnimationIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAnimationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
