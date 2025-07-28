import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InSidebarMenuComponent } from '../../in-sidebar-menu/in-sidebar-menu.component';

@Component({
  selector: 'app-in-main-layout',
  imports: [
    RouterOutlet,
    InSidebarMenuComponent,
  ],
  templateUrl: './in-main-layout.component.html',
  styleUrl: './in-main-layout.component.css'
})
export class InMainLayoutComponent {

}
