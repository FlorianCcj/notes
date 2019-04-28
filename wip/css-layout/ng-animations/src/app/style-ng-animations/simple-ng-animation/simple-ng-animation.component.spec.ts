import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleNgAnimationComponent } from './simple-ng-animation.component';

describe('SimpleNgAnimationComponent', () => {
  let component: SimpleNgAnimationComponent;
  let fixture: ComponentFixture<SimpleNgAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleNgAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleNgAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
