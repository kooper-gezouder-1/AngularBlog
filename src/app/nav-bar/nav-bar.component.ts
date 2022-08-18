import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import * as firebase from 'firebase' ;
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
	isAuth=false;
  constructor( private authService:AuthService,
  private route: Router ) { }

  ngOnInit(){
  	firebase.auth().onAuthStateChanged(
  		(user)=>{
  			if (user) {
  				this.isAuth=true;
  			}else{
  				this.isAuth=false;
  				this.route.navigate(['auth','signin']);
  			}
  		}
  	);
  }
  onSignOut(){
  	this.authService.signOut();
  }
}
