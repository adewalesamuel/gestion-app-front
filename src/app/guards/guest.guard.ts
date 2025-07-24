import { CanActivateFn, Router } from '@angular/router';
import { Utils } from '../utils';

export const guestGUard: CanActivateFn = (route, state) => {
  if (!Utils.isLoggedIn()) return true;

  const router = new Router();
  router.navigate(['/'], {replaceUrl: true});
  return false;
};
