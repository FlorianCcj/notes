import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-animation-multi-step-transition',
  templateUrl: './animation-multi-step-transition.component.html',
  styleUrls: ['./animation-multi-step-transition.component.scss'],
  animations: [
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
      transition('unselected => selected', [
        style({
          border: '2px solid black',
          padding: '4px',
        }),
        animate(300),
        style({
          backgroundColor: 'red'
        }),
        animate(300)
      ])
    ])
  ]
})
export class AnimationMultiStepTransitionComponent {
  numberEntered = null;
}
