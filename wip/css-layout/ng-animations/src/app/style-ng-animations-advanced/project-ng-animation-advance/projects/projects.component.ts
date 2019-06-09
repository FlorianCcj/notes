import { Component, OnInit, HostBinding } from '@angular/core';
import {AnimationEvent} from '@angular/animations';

import { Project } from './project.model';

import { ProjectsService } from './projects.service';
import { markedTrigger, itemStateTrigger, slideStateTrigger } from './animations';
import {
  routeFadeStateTrigger,
  routeSliderStateTrigger
} from '../shared/route-animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    markedTrigger,
    itemStateTrigger,
    slideStateTrigger,
    routeFadeStateTrigger,
    routeSliderStateTrigger
  ]
})
export class ProjectsComponent implements OnInit {
/* step9 */
// @HostBinding('@routeFadeState') routeAnimate = true;
@HostBinding('@routeSliderState') routeAnimate = true;

  projects: Project[];
  /* step4 */
  displayedProjects: Project[];
  markedPrjIndex = 0;
  progress = 'progressing';
  createNew = false;

  constructor(private prjService: ProjectsService) { }

  ngOnInit() {
    this.prjService.loadProjects()
      .subscribe(
        (prj: Project[]) => {
          this.progress = 'finished';
          this.projects = prj;
          /* step4 */
          if (this.projects.length >= 1) {
            this.displayedProjects.push(this.projects[0]);
          }
        }
      );
  }

  onStatusUpdated(newStatus: string, id: number) {
    this.projects[id].status = newStatus;
  }

  onProjectDeleted(index: number) {
    this.projects.splice(index, 1);
  }

  onProjectCreated(project: Project) {
    this.createNew = false;
    /* step7 */
    // this.projects.unshift(project);
    setTimeout(() => {
      this.projects.unshift(project);
    }, 300);
  }

  /* step4 */
  handleItemAnimated(animationEvent: AnimationEvent, lastPrjId: number) {
    if (animationEvent.fromState !== 'void') {
      return;
    }
    if (this.projects.length > lastPrjId + 1) {
      this.displayedProjects.push(this.projects[lastPrjId + 1]);
    } else {
      this.projects = this.displayedProjects;
    }
  }
}
