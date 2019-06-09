import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNgAnimationAdvanceComponent } from './project-ng-animation-advance.component';

describe('ProjectNgAnimationAdvanceComponent', () => {
  let component: ProjectNgAnimationAdvanceComponent;
  let fixture: ComponentFixture<ProjectNgAnimationAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNgAnimationAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNgAnimationAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
