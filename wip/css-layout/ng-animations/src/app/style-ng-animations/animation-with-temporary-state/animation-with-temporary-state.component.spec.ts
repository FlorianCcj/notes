import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationWithTemporaryStateComponent } from './animation-with-temporary-state.component';

describe('AnimationWithTemporaryStateComponent', () => {
  let component: AnimationWithTemporaryStateComponent;
  let fixture: ComponentFixture<AnimationWithTemporaryStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationWithTemporaryStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationWithTemporaryStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
