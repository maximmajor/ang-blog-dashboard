import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  // return inject(AuthService).isLoggedInGuard
  //   ?  true
  //   : false


    if(inject(AuthService).isLoggedInGuard){
      console.log('Access Granted')
       return true;	
    } else {
      console.log('Access Denied')
      inject(ToastrService).warning('you dont have permission to access this page ....')
      inject(Router).navigate(['/login'])
      return false;
    }
   
};