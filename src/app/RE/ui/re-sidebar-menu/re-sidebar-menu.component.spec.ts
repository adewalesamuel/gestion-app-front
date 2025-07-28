import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReSidebarMenuComponent } from './re-sidebar-menu.component';

describe('ReSidebarMenuComponent', () => {
  let component: ReSidebarMenuComponent;
  let fixture: ComponentFixture<ReSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReSidebarMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
