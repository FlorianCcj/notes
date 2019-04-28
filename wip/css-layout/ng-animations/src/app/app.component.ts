import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // #section2
  isFavorite = false;

  // #section1
  courseGoals = [
    {title: 'Master angular Styling', isActiveGoal: true },
    {title: 'Understand Angular Animation', isActiveGoal: false },
    {title: 'Master angular Animation', isActiveGoal: false },
  ];

  // #section2
  constructor(private renderer: Renderer2) {}

  // #section2
  onShowBoring(element: HTMLElement) {
    // element.style.display = 'block';
    this.renderer.setStyle(element, 'display', 'block');
  }
}
