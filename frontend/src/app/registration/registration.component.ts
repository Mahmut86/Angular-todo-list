import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  error;
  isSuccess;

  constructor(public authService: AthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  onRegister(user) {

    this.authService.saveUser(user).subscribe(
      resp => {
        this.isSuccess = true;
      },
      err => {
        this.isSuccess = false;
        this.error = err.error.message;
      });
  }

}
