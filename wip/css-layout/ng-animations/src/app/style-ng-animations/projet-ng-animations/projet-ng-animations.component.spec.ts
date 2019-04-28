import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetNgAnimationsComponent } from './projet-ng-animations.component';

describe('ProjetNgAnimationsComponent', () => {
  let component: ProjetNgAnimationsComponent;
  let fixture: ComponentFixture<ProjetNgAnimationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetNgAnimationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetNgAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
