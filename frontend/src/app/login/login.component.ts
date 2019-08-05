import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged = false;
  mode = 0;

  constructor(private authService: AthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  onLogin(user) {
    this.authService.login(user)
      .subscribe(resp => {
          const jwtToken = resp.headers.get('Authorization');
          this.authService.saveToken(jwtToken);
          this.router.navigateByUrl('/tasks');
          this.isLogged = true;

          console.log(jwtToken);

        }, err => {

          this.mode = 1;
        }
      );
  }

  isLoggedIn() {

    return this.isLogged;

  }
}
