import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleMultiCompComponent } from './style-multi-comp.component';

describe('StyleMultiCompComponent', () => {
  let component: StyleMultiCompComponent;
  let fixture: ComponentFixture<StyleMultiCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleMultiCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleMultiCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
