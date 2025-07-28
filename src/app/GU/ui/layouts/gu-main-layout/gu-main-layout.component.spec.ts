import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuMainLayoutComponent } from './gu-main-layout.component';

describe('GuMainLayoutComponent', () => {
  let component: GuMainLayoutComponent;
  let fixture: ComponentFixture<GuMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuMainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
