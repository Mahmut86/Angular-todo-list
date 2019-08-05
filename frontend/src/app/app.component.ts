import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AthenticationService } from './service/authentication.service';
import { LoginComponent } from './login/login.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn ;
  title = 'spring-jwt-angular-client';

  constructor(private authService: AthenticationService, private router: Router ) {

   }
/*  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');

  }*/



}


