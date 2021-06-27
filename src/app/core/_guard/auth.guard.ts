import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorage } from 'ngx-webstorage';
import { StoreService } from '../service/store.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
/*   @SessionStorage('isLoggedIn')
  public isLoggedIn;
  @SessionStorage('channel')
  public channel; */
  constructor(private router: Router,
    private storeService: StoreService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.storeService.get("isLoggedIn")) {
      // logged in so return true
      return true;
    }else{    
    // not logged in so redirect to login page with the return url    
      this.router.navigate(['/login'])
      return false;
    }
  }
}
