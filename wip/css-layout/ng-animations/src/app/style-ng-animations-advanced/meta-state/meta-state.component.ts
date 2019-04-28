import { Component, OnInit } from '@angular/core';
import {
  showStateTrigger,
  showStateBeforeVoidTrigger,
  showStateBeforeWildchartTrigger,
  showStateBeforeShortcutTrigger
} from './animations';

@Component({
  selector: 'app-meta-state',
  templateUrl: './meta-state.component.html',
  styleUrls: ['./meta-state.component.scss'],
  animations: [
    showStateBeforeVoidTrigger,
    showStateBeforeWildchartTrigger,
    showStateBeforeShortcutTrigger,
    showStateTrigger
  ]
})
export class MetaStateComponent {
  isShown = false;

  constructor() { }

}
