import { trigger, state, style, transition, animate } from '@angular/animations';

export const showStateBeforeVoidTrigger = trigger('showStateBeforeVoid', [
  state('notShown', style({})),
  state('shown', style({})),
  transition('notShown => shown', [
    style({
      opacity: 0
    }),
    animate(300, style({
      opacity: 1
    }))
  ])
]);

export const showStateBeforeWildchartTrigger = trigger('showStateBeforeWildchart', [
  state('shown', style({})),
  transition('void => shown', [
    style({
      opacity: 0
    }),
    animate(300)
  ]),
  transition('shown => void', animate(300, style({
    opacity: 0
  })))
]);

export const showStateBeforeShortcutTrigger = trigger('showStateBeforeShortcut', [
  transition('void => *', [
    style({
      opacity: 0
    }),
    animate(300)
  ]),
  transition('* => void', animate(300, style({
    opacity: 0
  })))
]);

export const showStateTrigger = trigger('showState', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(300)
  ]),
  transition(':leave', animate(300, style({
    opacity: 0
  })))
]);

