import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcMainLayoutComponent } from './rc-main-layout.component';

describe('RcMainLayoutComponent', () => {
  let component: RcMainLayoutComponent;
  let fixture: ComponentFixture<RcMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RcMainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RcMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
