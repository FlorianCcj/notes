import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexeTransitionComponent } from './complexe-transition.component';

describe('ComplexeTransitionComponent', () => {
  let component: ComplexeTransitionComponent;
  let fixture: ComponentFixture<ComplexeTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexeTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexeTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
