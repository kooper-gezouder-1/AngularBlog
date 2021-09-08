import { Component, OnInit } from '@angular/core';
import { AuthService  } from './../../services/auth.service';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
userForm: FormGroup;
errorMessage:string;

  constructor(private authService:AuthService,
  			private formBuilder: FormBuilder,
  			private route : Router) { }

  ngOnInit(){
  	this.initForm();
  }
  initForm(){
  	this.userForm=this.formBuilder.group({
  		email:['',[Validators.required,Validators.email]],
  		password:['',[Validators.required,Validators.pattern(/[0-9a-zA-z]{8,}/)]]

  	});
  }
  onCreatUser(){
  	const email=this.userForm.get('email').value;
  	const password=this.userForm.get('password').value;
  	this.authService.creatNewUser(email,password).then(
  		()=>{
  			this.route.navigate(['auth','signin']);
  		},
  		(error)=>{
  			this.errorMessage=error;
  		}
  	);
  	
  }
}
