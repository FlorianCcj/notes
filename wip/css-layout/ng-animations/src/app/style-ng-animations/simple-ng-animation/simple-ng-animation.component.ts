import { Component } from '@angular/core';
import { trigger, state, style } from '@angular/animations';

@Component({
  selector: 'app-simple-ng-animation',
  templateUrl: './simple-ng-animation.component.html',
  styleUrls: ['./simple-ng-animation.component.scss'],
  animations: [
    trigger('clickedState', [
      state('default', style({
        backgroundColor: 'orange',
        width: '100px',
        // width: 100, // also posible
        height: '100px',
      })),
      state('clicked', style({
        backgroundColor: 'blue',
        width: '300px',
        height: '50px',
      }))
    ])
  ]
})
export class SimpleNgAnimationComponent {

  clickInfo = 'default';
  constructor() { }

  clickSimple() {
    this.clickInfo = 'clicked';
    setTimeout(() => {
      this.clickInfo = 'default';
    }, 3000);
  }
}
