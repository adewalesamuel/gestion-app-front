import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuSidebarMenuComponent } from '../../gu-sidebar-menu/gu-sidebar-menu.component';

@Component({
  selector: 'app-gu-main-layout',
  imports: [
    RouterOutlet,
    GuSidebarMenuComponent
  ],
  templateUrl: './gu-main-layout.component.html',
  styleUrl: './gu-main-layout.component.css'
})
export class GuMainLayoutComponent {

}
