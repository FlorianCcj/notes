import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-animation',
  templateUrl: './basic-animation.component.html',
  styleUrls: ['./basic-animation.component.scss']
})
export class BasicAnimationComponent {

  divClicked = false;
  doAnimate = false;

  constructor() { }
}
