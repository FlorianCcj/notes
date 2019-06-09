import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTransitionComponent } from './simple-transition/simple-transition.component';
import { ComplexeTransitionComponent } from './complexe-transition/complexe-transition.component';
import { BasicAnimationComponent } from './basic-animation/basic-animation.component';
import { ComplexAnimationComponent } from './complex-animation/complex-animation.component';
import { ProjetCssAnimationComponent } from './projet-css-animation/projet-css-animation.component';
import { NewProjectComponent } from './projet-css-animation/new-project/new-project.component';
import { ProjectComponent } from './projet-css-animation/project/project.component';
import { ProjectsComponent } from './projet-css-animation/projects/projects.component';
import { UsersComponent } from './projet-css-animation/users/users.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    SimpleTransitionComponent, ComplexeTransitionComponent,
    BasicAnimationComponent, ComplexAnimationComponent,

    ProjetCssAnimationComponent,
    NewProjectComponent, ProjectComponent, ProjectsComponent,
    UsersComponent
  ]
})
export class StyleCssAnimationsTransitionsModule { }
