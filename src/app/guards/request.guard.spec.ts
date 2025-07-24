import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { requestGUard } from './request.guard';

describe('requestGUard', () => {
  const executeGUard: CanActivateChildFn = (...guardParameters) =>
      TestBed.runINInjectionContext(() => requestGUard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGUard).toBeTruthy();
  });
});
