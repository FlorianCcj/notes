import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationWithTransitionComponent } from './animation-with-transition.component';

describe('AnimationWithTransitionComponent', () => {
  let component: AnimationWithTransitionComponent;
  let fixture: ComponentFixture<AnimationWithTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationWithTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationWithTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
