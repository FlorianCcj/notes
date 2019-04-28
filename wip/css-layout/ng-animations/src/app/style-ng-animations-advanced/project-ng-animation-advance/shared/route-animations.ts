import { trigger, transition, style, animate } from '@angular/animations';

/* step9 */
export const routeFadeStateTrigger = trigger('routeFadeState', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(300),
  ]),
  transition(':leave', animate(300, style({
    opacity: 0,
  }))),
]);

/* step10 */
export const routeSliderStateTrigger = trigger('routeSliderState', [
  transition(':enter', [
    style({
      transform: 'translateY(-100%)',
      opacity: 0,
    }),
    animate(300),
  ]),
  transition(':leave', animate(300, style({
    transform: 'translateY(100)',
    opacity: 0
  }))),
]);
