import { trigger, state, style, animate, transition, keyframes, group } from '@angular/animations';

/* step8 */
export const buttonStateTrigger = trigger('buttonState', [
  state('valid', style({
    backgroundColor: 'lightgreen',
    borderColor: 'green',
    color: 'green',
  })),
  state('invalid', style({
    backgroundColor: 'red',
    color: 'white',
    borderColor: 'darkred',
  })),
  transition('invalid => valid', [
    group([
      animate(100, style({
        transformation: 'scale(1.1)',
      })),
      animate(200, style({
        backgroundColor: 'lightgreen',
      })),
    ]),
    animate(200, style({
      transform: 'scale(1)'
    })),
  ]),
  transition('valid => invalid', [
    group([
      animate(100, style({
        transformation: 'scale(1.1)',
      })),
      animate(200, style({
        backgroundColor: 'red',
      })),
    ]),
    animate(200, style({
      transform: 'scale(1)'
    })),
  ]),
]);
