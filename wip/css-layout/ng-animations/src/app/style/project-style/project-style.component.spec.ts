import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStyleComponent } from './project-style.component';

describe('ProjectStyleComponent', () => {
  let component: ProjectStyleComponent;
  let fixture: ComponentFixture<ProjectStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
