import {trigger, state, transition, style, animate} from '@angular/animations';

export const outsourcedTrigger = trigger('outsourcedState', [
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
]);
