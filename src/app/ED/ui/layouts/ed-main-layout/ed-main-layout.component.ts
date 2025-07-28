import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EdSidebarMenuComponent } from '../../ed-sidebar-menu/ed-sidebar-menu.component';

@Component({
  selector: 'app-ed-main-layout',
  imports: [
    RouterOutlet,
    EdSidebarMenuComponent,
  ],
  templateUrl: './ed-main-layout.component.html',
  styleUrl: './ed-main-layout.component.css'
})
export class EdMainLayoutComponent {

}
