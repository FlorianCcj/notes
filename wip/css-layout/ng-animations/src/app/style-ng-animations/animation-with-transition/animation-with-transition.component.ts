import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-animation-with-transition',
  templateUrl: './animation-with-transition.component.html',
  styleUrls: ['./animation-with-transition.component.scss'],
  animations: [
    trigger('clickedState', [
      state('default', style({
        backgroundColor: 'orange',
        width: '100px',
        height: '100px',
      })),
      state('clicked', style({
        backgroundColor: 'blue',
        width: '300px',
        height: '50px',
      })),
      transition('default => clicked', animate('1s 0.5s ease-in'))
    ])
  ]
})
export class AnimationWithTransitionComponent {
  clickInfo = 'default';
  constructor() { }

  clickSimple() {
    this.clickInfo = 'clicked';
    setTimeout(() => {
      this.clickInfo = 'default';
    }, 3000);
  }
}
