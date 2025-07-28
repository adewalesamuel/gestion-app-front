import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSidebarMenuComponent } from './common-sidebar-menu.component';

describe('CommonSidebarMenuComponent', () => {
  let component: CommonSidebarMenuComponent;
  let fixture: ComponentFixture<CommonSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonSidebarMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
