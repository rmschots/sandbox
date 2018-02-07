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
        icon: 'fa-book',
        routerLink: 'dossiers'
      }, {
        label: 'DOUBLE CLICK TREE',
        icon: 'fa-tree',
        routerLink: 'double-click-tree'
      }, {
        label: 'NAVBREAD',
        icon: 'fa-bars',
        routerLink: 'navbread/list'
      }, {
        label: 'LAZY TEST',
        icon: 'fa-spinner',
        routerLink: 'lazy-test'
      }
    ];
  }

}
