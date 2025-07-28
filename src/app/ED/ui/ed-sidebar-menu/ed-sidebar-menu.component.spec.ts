import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdSidebarMenuComponent } from './ed-sidebar-menu.component';

describe('EdSidebarMenuComponent', () => {
  let component: EdSidebarMenuComponent;
  let fixture: ComponentFixture<EdSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdSidebarMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
