import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-animation-with-multiple-transitions',
  templateUrl: './animation-with-multiple-transitions.component.html',
  styleUrls: ['./animation-with-multiple-transitions.component.scss'],
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

      state('mousedown', style({
        backgroundColor: 'red',
        width: '300px',
        height: '50px',
        border: '1px solid black',
      })),
      transition('default => clicked', animate('1s 0.5s ease-in')),
      transition('clicked => default', animate(300)),
      transition('mousedown <=> clicked', animate(300)),
    ]),
    trigger('numberEnteredState', [
      state('unselected', style({
        border: '1px solid black',
        padding: '5px',
      })),
      state('selected', style({
        border: '2px solid blue',
        padding: '4px',
        backgroundColor: 'lightBlue',
      })),
      transition('unselected => selected', animate(300))
    ])
  ]
})
export class AnimationWithMultipleTransitionsComponent {
  clickInfo = 'default';
  paragraphClick = 'default';
  numberEntered = null;
  constructor() { }

  clickSimple() {
    this.clickInfo = 'clicked';
    setTimeout(() => {
      this.clickInfo = 'default';
    }, 3000);
  }
}
