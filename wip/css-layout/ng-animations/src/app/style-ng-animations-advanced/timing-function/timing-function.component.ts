import { Component } from '@angular/core';
import {
  animateStateTrigger,
  animateStateBeforeTimingChangedTrigger,
  animateStateNormalTrigger,
  animateStateCubicTrigger
} from './animations';

@Component({
  selector: 'app-timing-function',
  templateUrl: './timing-function.component.html',
  styleUrls: ['./timing-function.component.scss'],
  animations: [
    animateStateBeforeTimingChangedTrigger,
    animateStateNormalTrigger,
    animateStateCubicTrigger,
    animateStateTrigger,
  ]
})
export class TimingFunctionComponent {
  width = 400;
  animate = false;

  constructor() { }

}
