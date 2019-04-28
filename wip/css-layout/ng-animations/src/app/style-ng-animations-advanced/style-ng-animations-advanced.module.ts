import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAnimationsAdvancedIndexComponent } from './ng-animations-advanced-index/ng-animations-advanced-index.component';
import { MetaStateComponent } from './meta-state/meta-state.component';
import { DynamicDimentionalPropComponent } from './dynamic-dimentional-prop/dynamic-dimentional-prop.component';
import { ListAnimationsComponent } from './list-animations/list-animations.component';
import { TimingFunctionComponent } from './timing-function/timing-function.component';
import { KeyframesComponent } from './keyframes/keyframes.component';
import { AnimationEventComponent } from './animation-event/animation-event.component';
import { ProjectNgAnimationAdvanceComponent } from './project-ng-animation-advance/project-ng-animation-advance.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  declarations: [
    NgAnimationsAdvancedIndexComponent,
    MetaStateComponent,
    DynamicDimentionalPropComponent,
    ListAnimationsComponent,
    TimingFunctionComponent,
    KeyframesComponent,
    AnimationEventComponent,
    ProjectNgAnimationAdvanceComponent
  ]
})
export class StyleNgAnimationsAdvancedModule { }
