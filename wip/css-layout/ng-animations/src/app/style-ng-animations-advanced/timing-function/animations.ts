import {trigger, transition, animate, style} from '@angular/animations';

export const animateStateBeforeTimingChangedTrigger = trigger('animateStateBeforeTimingChanged', [
  transition('* => *', [
    animate(400, style({
      width: 0
    })),
    animate(400, style({
      width: '100%'
    })),
  ]),
]);

export const animateStateNormalTrigger = trigger('animateStateNormal', [
  transition('* => *', [
    animate('4000ms ease-out', style({
      width: 0
    })),
    animate(400, style({
      width: '100%'
    })),
  ]),
]);

export const animateStateCubicTrigger = trigger('animateStateCubic', [
  transition('* => *', [
    animate('4000ms cubic-bezier()', style({
      width: 0
    })),
    animate(400, style({
      width: '100%'
    })),
  ]),
]);

export const animateStateTrigger = trigger('animateState', [
  transition('* => *', [
    animate('4000ms cubic-bezier(.16,.78,0,.92)', style({
      width: 0
    })),
    animate(400, style({
      width: '100%'
    })),
  ]),
]);
