import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-gu-sidebar-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './gu-sidebar-menu.component.html',
  styleUrl: './gu-sidebar-menu.component.css'
})
export class GuSidebarMenuComponent {

}
