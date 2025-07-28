import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReSidebarMenuComponent } from '../../re-sidebar-menu/re-sidebar-menu.component';

@Component({
  selector: 'app-re-main-layout',
  imports: [
    RouterOutlet,
    ReSidebarMenuComponent
  ],
  templateUrl: './re-main-layout.component.html',
  styleUrl: './re-main-layout.component.css'
})
export class ReMainLayoutComponent {

}
