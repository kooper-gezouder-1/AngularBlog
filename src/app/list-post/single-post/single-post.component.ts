import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router'
import { Post } from './../../models/Post.model';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
	post:Post;
  constructor(private router: Router,
  			private route:ActivatedRoute,
  			private postService:PostService) { }

  ngOnInit(){
  	this.post=new Post('','','');
  	const id =this.route.snapshot.params['id'];
  	this.postService.getSinglePost(id).then(
  		(post:Post)=>{
  			this.post=post;
  		}
  	);
  }
  onBack(){
  	this.router.navigate(['/posts']);
  }

}
