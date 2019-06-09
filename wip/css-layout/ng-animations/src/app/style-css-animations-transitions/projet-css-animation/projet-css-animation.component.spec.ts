import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetCssAnimationComponent } from './projet-css-animation.component';

describe('ProjetCssAnimationComponent', () => {
  let component: ProjetCssAnimationComponent;
  let fixture: ComponentFixture<ProjetCssAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetCssAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetCssAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
