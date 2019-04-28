import { Component, OnInit, HostBinding } from '@angular/core';
import {
  routeFadeStateTrigger,
  routeSliderStateTrigger
} from '../shared/route-animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    routeFadeStateTrigger,
    routeSliderStateTrigger,
  ]
})
export class UsersComponent implements OnInit {

/* step9 */
@HostBinding('@routeFadeState') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}
