import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'sb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'DOSSIERS',
        icon: 'fa fa-fw fa-book',
        routerLink: 'dossiers'
      }, {
        label: 'DOUBLE CLICK TREE',
        icon: 'fa fa-fw fa-tree',
        routerLink: 'double-click-tree'
      }, {
        label: 'NAVBREAD',
        icon: 'fa fa-fw fa-bars',
        routerLink: 'navbread/list'
      }, {
        label: 'LAZY TEST',
        icon: 'fa fa-fw fa-spinner',
        routerLink: 'lazy-test'
      }, {
        label: 'INVALID DATE PICKER',
        icon: 'fa fa-fw fa-calendar',
        routerLink: 'invalid-date-picker'
      }, {
        label: 'INTRO DEMO',
        icon: 'fa fa-fw fa-question-circle',
        routerLink: 'intro-demo'
      }, {
        label: 'PLACE COMPONENT',
        icon: 'fa fa-fw fa-globe',
        routerLink: 'place-component'
      }
    ];
  }

}
