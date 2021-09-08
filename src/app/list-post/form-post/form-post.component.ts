import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/post.service';
import { Router } from '@angular/Router';
import { FormBuilder , Validators, FormGroup } from '@angular/forms';
import { Post } from './../../models/Post.model';

@Component({
  selector: 'app-form-post',
  templateUrl: './form-post.component.html',
  styleUrls: ['./form-post.component.scss']
})
export class FormPostComponent implements OnInit {
addForm: FormGroup;
fileIsUploding=false;
fileUrl:string;
fileUploded=false;

  constructor(private postService:PostService,
  				private route:Router,
  				private formBuilder:FormBuilder) { }

  ngOnInit(){
  	this.initForm();
  }
  initForm(){
  	this.addForm=this.formBuilder.group({
  		title:['',Validators.required],
  		content:['',Validators.required],
  		Postdate:''
  	});
  }
  onAddPost(){
  	const title=this.addForm.get('title').value;
  	const content=this.addForm.get('content').value;
  	const Postdate=Date.now().toString();
  	const newPost= new Post(title,content,Postdate);
  	if (this.fileUrl && this.fileUrl !== '') {
  		newPost.picture= this.fileUrl;
  	}
  	this.postService.creatNewPost(newPost);
  	this.route.navigate(['/posts']);
  }
  onUploadFile(file:File){
  	this.fileIsUploding=true;
  	this.postService.uploadFile(file).then(
  		(Url:string)=>{
  			this.fileUrl=Url;
  			this.fileUploded=true;
  			this.fileIsUploding=false;
  		}
  	);
  }
  onDetectFile(event){
  	this.onUploadFile(event.target.files[0]);
  }
}
