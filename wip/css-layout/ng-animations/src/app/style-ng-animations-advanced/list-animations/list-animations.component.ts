import { Component } from '@angular/core';
import { showStateTrigger } from '../meta-state/animations';
import { listStateToStudyTrigger, listStateBeforeGroupTrigger } from './animations';

@Component({
  selector: 'app-list-animations',
  templateUrl: './list-animations.component.html',
  styleUrls: ['./list-animations.component.scss'],
  animations: [
    showStateTrigger,
    listStateBeforeGroupTrigger,
    listStateToStudyTrigger,
  ]
})
export class ListAnimationsComponent {
  testResults = [];

  handleAddElementClicked() {
    this.testResults.push(Math.random());
  }
}
