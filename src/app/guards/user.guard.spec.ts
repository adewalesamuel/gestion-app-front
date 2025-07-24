import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userGUard } from './user.guard';

describe('userGUard', () => {
  const executeGUard: CanActivateFn = (...guardParameters) =>
      TestBed.runINInjectionContext(() => userGUard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGUard).toBeTruthy();
  });
});
