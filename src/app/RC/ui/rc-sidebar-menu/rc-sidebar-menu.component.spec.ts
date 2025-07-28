import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcSidebarMenuComponent } from './rc-sidebar-menu.component';

describe('RcSidebarMenuComponent', () => {
  let component: RcSidebarMenuComponent;
  let fixture: ComponentFixture<RcSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RcSidebarMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RcSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
