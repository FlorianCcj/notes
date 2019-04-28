import {trigger, transition, animate, style} from '@angular/animations';

export const animateStateTrigger = trigger('animateState', [
  transition('* => *', [
    animate(400, style({
      width: 0
    })),
    animate(400, style({
      width: '100%'
    })),
  ]),
]);

export const animateMetaStateTrigger = trigger('animateMetaState', [
  transition('* => *', [
    animate(400, style({
      width: 0
    })),
    animate(400, style({
      width: '*'
    })),
  ]),
]);
