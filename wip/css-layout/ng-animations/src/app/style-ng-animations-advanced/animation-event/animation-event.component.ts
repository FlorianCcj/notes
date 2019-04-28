import { Component } from '@angular/core';
import { ShowStateTrigger } from './animations';

@Component({
  selector: 'app-animation-event',
  templateUrl: './animation-event.component.html',
  styleUrls: ['./animation-event.component.scss'],
  animations: [
    ShowStateTrigger,
  ]
})
export class AnimationEventComponent {
  testResults = [];

  constructor() { }

  handleAddElementClicked() {
    this.testResults.push(Math.random());
  }

  handleAnimationStarted(event: AnimationEvent) {
    console.log(event);
  }

  handleAnimationDone(event: AnimationEvent) {
    console.log(event);
  }
}
