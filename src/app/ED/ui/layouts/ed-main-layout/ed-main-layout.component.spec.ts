import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdMainLayoutComponent } from './ed-main-layout.component';

describe('EdMainLayoutComponent', () => {
  let component: EdMainLayoutComponent;
  let fixture: ComponentFixture<EdMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdMainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
