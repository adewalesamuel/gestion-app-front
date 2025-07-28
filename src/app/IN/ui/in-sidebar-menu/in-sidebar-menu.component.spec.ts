import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InSidebarMenuComponent } from './in-sidebar-menu.component';

describe('InSidebarMenuComponent', () => {
  let component: InSidebarMenuComponent;
  let fixture: ComponentFixture<InSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InSidebarMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
