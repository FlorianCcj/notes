import { trigger, state, style, animate, transition } from '@angular/animations';

/* step1 */
export const markedTrigger = trigger('markedTrigger', [
  /* step1 */
  // state('default', style({
  //   border: '1px solid black',
  //   backgroundColor: 'transparent',
  // })),
  /* step3 */
  state('default', style({
    border: '1px solid black',
    backgroundColor: 'transparent',
    padding: '20px',
  })),
  /* step1 */
  // state('default', style({
  //   border: '2px solid blue',
  //   backgroundColor: '#caeff9',
  // })),
  /* step3 */
  state('default', style({
    border: '1px solid black',
    backgroundColor: 'transparent',
    padding: '19px',
  })),
  /* step2 */
  // transition('default <=> marked', animate('300ms ease-out')),
  /* step3 */
  // transition('default => marked', [
  //   style({
  //     border: '2px solid black',
  //     padding: '19px',
  //   }),
  //   animate('300ms ease-out')
  // ]),
  /* step4 */
  transition('default => marked', [
    style({
      border: '2px solid black',
      padding: '19px',
    }),
    animate('200ms ease-out', style({
      transform: 'scale(1.05)'
    })),
    animate(200)
  ]),
  /* step3 */
  transition('marked => default', [
    style({
      border: '1px solid blue',
      padding: '20px',
    }),
    animate('300ms ease-out')
  ]),
]);
