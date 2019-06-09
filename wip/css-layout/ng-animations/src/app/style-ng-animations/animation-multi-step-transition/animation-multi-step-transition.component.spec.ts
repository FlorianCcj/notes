import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationMultiStepTransitionComponent } from './animation-multi-step-transition.component';

describe('AnimationMultiStepTransitionComponent', () => {
  let component: AnimationMultiStepTransitionComponent;
  let fixture: ComponentFixture<AnimationMultiStepTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationMultiStepTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationMultiStepTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
