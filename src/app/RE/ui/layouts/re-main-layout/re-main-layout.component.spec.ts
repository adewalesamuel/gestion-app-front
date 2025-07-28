import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReMainLayoutComponent } from './re-main-layout.component';

describe('ReMainLayoutComponent', () => {
  let component: ReMainLayoutComponent;
  let fixture: ComponentFixture<ReMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReMainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
