import { Injectable } from '@angular/core';
import { CanActivate,Router  } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class GardeService implements CanActivate {

  constructor(private route: Router) { }
  canActivate(): Observable<boolean>|Promise<boolean>|boolean{
  	return new Promise(
  		(resolve,reject)=>{
  			firebase.auth().onAuthStateChanged(
  				(user)=>{
  					if(user){
  						resolve(true);
  					}else{
  						this.route.navigate(['auth','signin']);
  						reject(false);
  					}
  				}
  			);
  		}
  	);
  }
}
