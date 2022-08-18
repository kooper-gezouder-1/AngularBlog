import { Component, OnInit,OnDestroy } from '@angular/core';
import { PostService } from './../services/post.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Post } from './../models/Post.model';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit, OnDestroy{
 posts:Post[];
 postSubscription:Subscription;

  constructor(private postService: PostService
  ,private route:Router ) { }

  ngOnInit(){
  	this.postSubscription=this.postService.postsSubject.subscribe(
  		(post: Post[])=>{
  			this.posts=post;
  		}
  	);
  	this.postService.getPost();
  	this.postService.emitPost();
  }
  onRemovePost(post:Post){
  	this.postService.removePost(post);
  }
  onSingleView(id:number){
  	this.route.navigate(['post','single',id]);
  }
  onLike(post:Post){
  	this.postService.like(post);
  }
  ngOnDestroy(){
  	this.postSubscription.unsubscribe();
  }

}
