import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-rc-sidebar-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './rc-sidebar-menu.component.html',
  styleUrl: './rc-sidebar-menu.component.css'
})
export class RcSidebarMenuComponent {

}
