import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);

  const ulogovan = localStorage.getItem('ulogovan');

  if (!ulogovan) {
    if (state.url.startsWith('/admin')) {
      router.navigate(['/admin/login']);
    }
    else if (state.url.startsWith('/nastavnik')) {
      router.navigate(['/nastavnik/login']);
    }
    else {
      router.navigate(['/login']);
    }
    return false;
  }

  const ulogovanObjekat = JSON.parse(ulogovan);

  const dozvoljeneRole: string[] = route.data['roles'];

  if (!dozvoljeneRole || dozvoljeneRole.length === 0) {
    return false;
  }

  if (dozvoljeneRole.includes(ulogovanObjekat.tip)) {
    return true;
  }

  router.navigate(['/neautorizovan']);
  return false;
};
