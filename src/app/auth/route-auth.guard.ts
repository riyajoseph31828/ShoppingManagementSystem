import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const routeAuthGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isLoggedIn();
  //return true;
};
