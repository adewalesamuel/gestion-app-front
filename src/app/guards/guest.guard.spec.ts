import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guestGUard } from './guest.guard';

describe('guestGUard', () => {
  const executeGUard: CanActivateFn = (...guardParameters) =>
      TestBed.runINInjectionContext(() => guestGUard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGUard).toBeTruthy();
  });
});
