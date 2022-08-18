import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
loginForm:FormGroup;
errorMessage:string;
  constructor(private authService:AuthService,
  	private formBuilder:FormBuilder,
  	private route : Router) { }

  ngOnInit(){
  	this.initForm();
  }
  initForm(){
  	this.loginForm=this.formBuilder.group({
  		email:['',[Validators.required,Validators.email]],
  		password:['',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{8,}/)]]
  	});
  }
  onLogin(){
  	const email=this.loginForm.get('email').value;
  	const password=this.loginForm.get('password').value;
  	this.authService.signIn(email,password).then(
  		()=>{
  			this.route.navigate(['/posts']);
  		},
  		(error)=>{
  			this.errorMessage=error;
  		}
  	);
  }

}
