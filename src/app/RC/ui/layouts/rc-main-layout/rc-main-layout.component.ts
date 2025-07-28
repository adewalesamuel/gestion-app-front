import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RcSidebarMenuComponent } from '../../rc-sidebar-menu/rc-sidebar-menu.component';

@Component({
  selector: 'app-rc-main-layout',
  imports: [
    RcSidebarMenuComponent,
    RouterOutlet
  ],
  templateUrl: './rc-main-layout.component.html',
  styleUrl: './rc-main-layout.component.css'
})
export class RcMainLayoutComponent {

}
