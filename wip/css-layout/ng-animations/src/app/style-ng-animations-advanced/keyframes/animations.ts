import {trigger, transition, animate, style, group, keyframes} from '@angular/animations';

export const ShowStateWithoutKeyframesTrigger = trigger('ShowStateWithoutKeyframes', [
  transition(':enter', [
    style({
      opacity: 0,
      backgroundColor: 'white',
    }),
    group([
      animate(1000, style({
        opacity: 0.7,
      })),
      animate(2000, style({
        backgroundColor: 'red'
      }))
    ]),
    animate(500, style({
      backgroundColor: 'lightblue'
    }))
  ]),
  transition(':leave', animate(300, style({
    opacity: 0
  })))
]);

export const ShowStateWithoutManagingTrigger = trigger('ShowStateWithoutManaging', [
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
          backgroundColor: 'white'
        }),
        style({
          backgroundColor: 'red',
        }),
        style({
          backgroundColor: 'green',
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
