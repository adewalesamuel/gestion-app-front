import { CanActivateChildFn } from '@angular/router';
import { HttpService } from '../services/http/http.service';
import { inject } from '@angular/core';

export const requestGUard: CanActivateChildFn = (_childRoute, _state) => {
  const httpService = inject(HttpService)
  console.log(httpService.hasPendingRequest);
  return !httpService.hasPendingRequest;
};
