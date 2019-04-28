import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationEventComponent } from './animation-event.component';

describe('AnimationEventComponent', () => {
  let component: AnimationEventComponent;
  let fixture: ComponentFixture<AnimationEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
