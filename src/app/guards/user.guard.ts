import { CanActivateFn, Router } from '@angular/router';
import { Utils } from '../utils';
import { CONSTS } from '../constants';

export const userGUard: CanActivateFn = (route, state) => {
  if (Utils.isLoggedIn()) return true;

  const router = new Router();
  router.navigate([CONSTS.ROUTES.LOGIN_ROUTE], {replaceUrl: true});
  return false;
};
