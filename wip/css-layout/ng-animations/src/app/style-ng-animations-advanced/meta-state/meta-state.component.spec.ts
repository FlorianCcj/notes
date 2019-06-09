import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaStateComponent } from './meta-state.component';

describe('MetaStateComponent', () => {
  let component: MetaStateComponent;
  let fixture: ComponentFixture<MetaStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
