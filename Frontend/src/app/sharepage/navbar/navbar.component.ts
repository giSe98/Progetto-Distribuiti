import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn = false;
  constructor(private router: Router,private authenticationService: AuthenticationService) { }

  refresh(): void{
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    this.router.events.subscribe(event=>{
      if(event.constructor.name==="NavigationEnd"){
        this.isLoggedIn = this.authenticationService.isUserLoggedIn();
      }
    })
  }

  handleLogout(){
    this.authenticationService.logout();
  }

}
