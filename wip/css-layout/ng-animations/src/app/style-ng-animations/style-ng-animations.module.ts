/* tslint:disable:max-line-length */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetNgAnimationsComponent } from './projet-ng-animations/projet-ng-animations.component';
import { NewProjectComponent } from './projet-ng-animations/new-project/new-project.component';
import { ProjectComponent } from './projet-ng-animations/project/project.component';
import { ProjectsComponent } from './projet-ng-animations/projects/projects.component';
import { UsersComponent } from './projet-ng-animations/users/users.component';
import { SimpleNgAnimationComponent } from './simple-ng-animation/simple-ng-animation.component';
import { AnimationWithTransitionComponent } from './animation-with-transition/animation-with-transition.component';
import { NgAnimationIndexComponent } from './ng-animation-index/ng-animation-index.component';
import { AnimationWithMultipleTransitionsComponent } from './animation-with-multiple-transitions/animation-with-multiple-transitions.component';
import { AnimationWithTemporaryStateComponent } from './animation-with-temporary-state/animation-with-temporary-state.component';
import { AnimationMultiStepTransitionComponent } from './animation-multi-step-transition/animation-multi-step-transition.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  declarations: [
    ProjetNgAnimationsComponent,
    NewProjectComponent,
    ProjectComponent,
    ProjectsComponent,
    UsersComponent,
    SimpleNgAnimationComponent,
    AnimationWithTransitionComponent,
    NgAnimationIndexComponent,
    AnimationWithMultipleTransitionsComponent,
    AnimationWithTemporaryStateComponent,
    AnimationMultiStepTransitionComponent,
  ],
})
export class StyleNgAnimationsModule { }
