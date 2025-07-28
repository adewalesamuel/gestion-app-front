import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-ed-sidebar-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './ed-sidebar-menu.component.html',
  styleUrl: './ed-sidebar-menu.component.css'
})
export class EdSidebarMenuComponent {

}
