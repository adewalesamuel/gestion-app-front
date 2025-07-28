import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InMainLayoutComponent } from './in-main-layout.component';

describe('InMainLayoutComponent', () => {
  let component: InMainLayoutComponent;
  let fixture: ComponentFixture<InMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InMainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
