import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleSingleCompComponent } from './style-single-comp.component';

describe('StyleSingleCompComponent', () => {
  let component: StyleSingleCompComponent;
  let fixture: ComponentFixture<StyleSingleCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleSingleCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleSingleCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
