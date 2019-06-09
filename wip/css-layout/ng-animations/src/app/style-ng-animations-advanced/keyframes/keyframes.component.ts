import { Component, OnInit } from '@angular/core';
import {
  ShowStateTrigger,
  ShowStateWithoutKeyframesTrigger,
  ShowStateWithoutManagingTrigger
} from './animations';

@Component({
  selector: 'app-keyframes',
  templateUrl: './keyframes.component.html',
  styleUrls: ['./keyframes.component.scss'],
  animations: [
    ShowStateWithoutKeyframesTrigger,
    ShowStateWithoutManagingTrigger,
    ShowStateTrigger,
  ]
})
export class KeyframesComponent {
  testResults = [];

  constructor() { }

  handleAddElementClicked() {
    this.testResults.push(Math.random());
  }

}
