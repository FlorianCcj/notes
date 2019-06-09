import { trigger, transition, style, animate, group } from '@angular/animations';

export const listStateBeforeGroupTrigger = trigger('listStateBeforeGroup', [
  transition(':enter', [
    style({
      opacity: 0,
      backgroundColor: 'white',
    }),
    animate(200, style({
      opacity: 1,
    })),
    animate(300)
  ]),
  transition(':leave', animate(300, style({
    opacity: 0
  })))
]);

export const listStateToStudyTrigger = trigger('listStateToStudy', [
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
