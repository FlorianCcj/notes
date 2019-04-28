import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAnimationComponent } from './basic-animation.component';

describe('BasicAnimationComponent', () => {
  let component: BasicAnimationComponent;
  let fixture: ComponentFixture<BasicAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
