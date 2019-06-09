import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAnimationsAdvancedIndexComponent } from './ng-animations-advanced-index.component';

describe('NgAnimationsAdvancedIndexComponent', () => {
  let component: NgAnimationsAdvancedIndexComponent;
  let fixture: ComponentFixture<NgAnimationsAdvancedIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgAnimationsAdvancedIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAnimationsAdvancedIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
