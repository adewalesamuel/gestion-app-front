import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonSidebarMenuComponent } from '../../common-sidebar-menu/common-sidebar-menu.component';

@Component({
  selector: 'app-common-main-layout',
  imports: [
    RouterOutlet,
    CommonSidebarMenuComponent,
  ],
  templateUrl: './common-main-layout.component.html',
  styleUrl: './common-main-layout.component.css'
})
export class CommonMainLayoutComponent {

}
