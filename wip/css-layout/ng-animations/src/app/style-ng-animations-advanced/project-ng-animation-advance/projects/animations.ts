import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const markedTrigger = trigger('markedTrigger', [
  state('default', style({
    border: '1px solid black',
    backgroundColor: 'transparent',
    padding: '20px',
  })),
  state('default', style({
    border: '1px solid black',
    backgroundColor: 'transparent',
    padding: '19px',
  })),
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
  transition('marked => default', [
    style({
      border: '1px solid blue',
      padding: '20px',
    }),
    animate('300ms ease-out')
  ]),
]);

/* step1 */
export const itemStateTrigger = trigger('itemState', [
  /* step1 */
  transition(':enter', [
    /* step 1 */
    // style({
    //   opacity: 0,
    //   transform: 'translateX(-100%)',
    // }),
    /* step1 */
    // animate('500ms ease-out', style({
    //   opacity: 1,
    //   transform: 'translateX(0)',
    // })),
    /* step2 */
    animate('500ms ease-out', keyframes([
      /* step2 */
      style({
        opacity: 0,
        transform: 'translateX(-100%)',
        /* step3 */
        offset: 0,
      }),
      /* step3 */
      style({
        opacity: 1,
        transform: 'translateX(15%)',
        offset: 0.4,
      }),
      /* step2 */
      style({
        opacity: 1,
        transform: 'translateX(0)',
        /* step3 */
        offset: 1,
      }),
    ])),
  ]),
  /* step1 */
  transition(':leave', [
    /* step1 */
    // animate('500ms ease-in', style({
    //   opacity: 0,
    //   transform: 'translateX(100%)',
    // })),
    /* step2 */
    animate('500ms ease-in', keyframes([
      style({
        opacity: 1,
        transform: 'translateX(0)',
      }),
      style({
        transform: 'translateX(-15%)',
      }),
      style({
        opacity: 0,
        transform: 'translateX(100%)',
      }),
    ])),
  ]),
  /* step6 */
  transition('slidUp => slidDown', [
    style({
      transform: 'translateY(-100%)',
    }),
    animate('300ms ease-out', style({
      transform: 'translateY(0)'
    })),
  ]),
  /* step6 */
  transition('slidDown => slidUp', [
    style({
      transform: 'translateY(0)',
    }),
    animate('300ms ease-out', style({
      transform: 'translateY(-100%)'
    })),
  ]),
]);

/* step5 */
export const slideStateTrigger = trigger('slideState', [
/* step5 */
transition(':enter', [
  /* step5 */
    style({
      transform: 'translateY(-100%)',
    }),
    /* step5 */
    animate('300ms ease-out', style({
      transform: 'translateY(0)',
    })),
  ]),
  /* step6 */
  transition(':leave', [
  /* step6 */
    style({
      transform: 'translateY(0)',
    }),
    /* step6 */
    animate('300ms ease-out', style({
      transform: 'translateY(-100%)',
    })),
  ]),
]);
