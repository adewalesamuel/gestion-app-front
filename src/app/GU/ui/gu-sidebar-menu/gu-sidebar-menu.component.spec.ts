import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuSidebarMenuComponent } from './gu-sidebar-menu.component';

describe('GuSidebarMenuComponent', () => {
  let component: GuSidebarMenuComponent;
  let fixture: ComponentFixture<GuSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuSidebarMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
