import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {outsourcedTrigger} from './animations';

@Component({
  selector: 'app-animation-with-temporary-state',
  templateUrl: './animation-with-temporary-state.component.html',
  styleUrls: ['./animation-with-temporary-state.component.scss'],
  animations: [
    trigger('firstNumberEnteredState', [
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
        /* step1 */
        animate(2000),
        style({
          backgroundColor: 'red'
        }),
        animate(2000)
      ])
    ]),
    trigger('secondNumberEnteredState', [
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
        /* step2 */
        animate(2000, style({
          backgroundColor: 'red'
        })),
        animate(2000)
      ])
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
      transition('unselected => selected', [
        style({
          border: '2px solid black',
          padding: '4px',
        }),
        animate(2000, style({
          backgroundColor: 'red'
      })),
        /* step3 */
        // animate(2000)
      ]),
    ]),
    trigger('correctNumberEnteredState', [
      state('unselected', style({
        border: '1px solid black',
        padding: '5px',
        /* step4 */
        backgroundColor: 'white'
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
        /* step4 */
        animate('600ms 100ms ease-out', style({
          backgroundColor: 'red',
          transform: 'scale(1.05)'
      })),
        animate(300)
      ])
    ]),
    outsourcedTrigger,
  ]
})
export class AnimationWithTemporaryStateComponent {
  numberEntered = null;
}
