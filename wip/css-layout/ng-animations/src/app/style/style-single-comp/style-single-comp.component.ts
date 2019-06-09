import { Component } from '@angular/core';

@Component({
  selector: 'app-style-single-comp',
  templateUrl: './style-single-comp.component.html',
  styleUrls: ['./style-single-comp.component.scss']
})
export class StyleSingleCompComponent {

  courseGoals = [
    {title: 'Master angular Styling', isActiveGoal: true },
    {title: 'Understand Angular Animation', isActiveGoal: false },
    {title: 'Master angular Animation', isActiveGoal: false },
  ];
}
