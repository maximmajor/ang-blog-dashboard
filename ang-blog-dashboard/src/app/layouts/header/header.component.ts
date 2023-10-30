import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userEmail!: string;
  isLoggedIn$!: Observable<boolean>;
constructor(private authService: AuthService){}
  ngOnInit(): void {
    const userDataString = localStorage.getItem('user') || ''
    const userData = JSON.parse(userDataString).email;
    console.log(userData);
    this.userEmail = userData

    this.isLoggedIn$ = this.authService.isLoggedIn()

  }

  onLogout(){
    this.authService.logOut()
  }



}

