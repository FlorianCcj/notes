import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexAnimationComponent } from './complex-animation.component';

describe('ComplexAnimationComponent', () => {
  let component: ComplexAnimationComponent;
  let fixture: ComponentFixture<ComplexAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
