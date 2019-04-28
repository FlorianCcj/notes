import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnimationsComponent } from './list-animations.component';

describe('ListAnimationsComponent', () => {
  let component: ListAnimationsComponent;
  let fixture: ComponentFixture<ListAnimationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAnimationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
