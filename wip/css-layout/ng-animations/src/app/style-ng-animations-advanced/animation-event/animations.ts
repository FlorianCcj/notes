import {trigger, transition, animate, style, group, keyframes} from '@angular/animations';

export const ShowStateTrigger = trigger('ShowState', [
  transition(':enter', [
    style({
      opacity: 0,
      backgroundColor: 'white',
    }),
    group([
      animate(1000, style({
        opacity: 0.7,
      })),
      animate('5000ms ease-out', keyframes([
        style({
          backgroundColor: 'white',
          offset: 0,
        }),
        style({
          backgroundColor: 'red',
          offset: 0.8,
        }),
        style({
          backgroundColor: 'green',
          offset: 1,
        }),
      ])),
    ]),
    animate(500, style({
      backgroundColor: 'lightblue'
    }))
  ]),
  transition(':leave', animate(300, style({
    opacity: 0
  })))
]);
