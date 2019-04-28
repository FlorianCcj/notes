import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDimentionalPropComponent } from './dynamic-dimentional-prop.component';

describe('DynamicDimentionalPropComponent', () => {
  let component: DynamicDimentionalPropComponent;
  let fixture: ComponentFixture<DynamicDimentionalPropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicDimentionalPropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDimentionalPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
