import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProjectsComponent } from './project-style/projects/projects.component';
import { UsersComponent } from './project-style/users/users.component';
import { StyleSingleCompComponent } from './style-single-comp/style-single-comp.component';
import { StyleMultiCompComponent } from './style-multi-comp/style-multi-comp.component';

const appRoutes: Routes = [
  { path: 'single-comp', component: StyleSingleCompComponent },
  { path: 'multi-comp', component: StyleMultiCompComponent },
  { path: '', redirectTo: 'single-comp', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class StyleRoutingModule {}
