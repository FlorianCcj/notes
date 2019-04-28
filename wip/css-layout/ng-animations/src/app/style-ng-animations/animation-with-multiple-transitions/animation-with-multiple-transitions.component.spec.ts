import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationWithMultipleTransitionsComponent } from './animation-with-multiple-transitions.component';

describe('AnimationWithMultipleTransitionsComponent', () => {
  let component: AnimationWithMultipleTransitionsComponent;
  let fixture: ComponentFixture<AnimationWithMultipleTransitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationWithMultipleTransitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationWithMultipleTransitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
