import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-style-multi-comp',
  templateUrl: './style-multi-comp.component.html',
  styleUrls: ['./style-multi-comp.component.scss']
})
export class StyleMultiCompComponent implements OnInit {

  isFavorite = false;
  showBoring = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  handleShowBoringClick(element: HTMLElement) {
    this.showBoring = !this.showBoring;
    // element.style.display = 'block';
    this.renderer.setStyle(element, 'display', !this.showBoring ? 'none' : 'block');
  }
}
