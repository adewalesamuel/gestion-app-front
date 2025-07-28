import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-common-sidebar-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './common-sidebar-menu.component.html',
  styleUrl: './common-sidebar-menu.component.css'
})
export class CommonSidebarMenuComponent {

}
