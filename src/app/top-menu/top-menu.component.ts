import { Component } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {

  navbarCollapsed = true;

  constructor() {}

  toggleNavbar(): void {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
