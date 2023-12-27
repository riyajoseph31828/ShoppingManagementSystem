import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngulDemoApp';

  constructor(private authServ: AuthService){
    authServ.logOut(); //if we close the browser without clicking the logout ,then we want to load the login without the navbar
  }

  isLoggedIn():boolean{
    return this.authServ.isLoggedIn();
  }

  logout(){
    this.authServ.logOut();
  }
}
