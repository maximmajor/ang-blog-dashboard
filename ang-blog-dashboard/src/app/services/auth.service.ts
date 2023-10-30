import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false

  constructor(private afAuthService: AngularFireAuth, private toastr: ToastrService, private router: Router) { }

  login(email: any, password: any){
    this.afAuthService.signInWithEmailAndPassword(email, password).then(logRef =>{
      this.toastr.success('Logged In Successfully')
      this.loadUser()
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['/'])


    }).catch(e =>{
      this.toastr.warning('invalid Email or Password')
    })
  }


  loadUser(){
    this.afAuthService.authState.subscribe(user =>{   
      console.log(JSON.parse(JSON.stringify(user)))
      localStorage.setItem('user', JSON.stringify(user));
  })
}

logOut(){
  this.afAuthService.signOut().then(() =>{
    this.toastr.success('User Logged Out Successfully')
    localStorage.removeItem('user')
    this.loggedIn.next(false);
    this.isLoggedInGuard = false
    this.router.navigate(['/login'])
  })
}

isLoggedIn(){
  return this.loggedIn.asObservable()
}
}