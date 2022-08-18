import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Post } from './../models/Post.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
@Injectable({
  providedIn: 'root'
})
export class PostService {
post : Post[]=[];
postsSubject = new Subject<any[]>();
  constructor() {
  	this.getPost();
   }
  emitPost(){
  	this.postsSubject.next(this.post);
  }
  savePost(){
  	firebase.database().ref('/posts').set(this.post);
  }
  getPost(){
  	firebase.database().ref('/posts').on('value',
  		(data: DataSnapshot)=>{
  			this.post=data.val()?data.val():[];
  			this.emitPost
  		}
  		);
  }
  getSinglePost(id:number){
  	return new Promise(
  		(resolve,reject)=>{
  			firebase.database().ref('/posts/'+id).once('value').then(
  				(data:DataSnapshot)=>{
  					resolve(data.val());
  				},
  				(error)=>{
  					reject(error);
  				}
  			);
  		}
  	);
  }
  creatNewPost(newPost:Post){
  	this.post.push(newPost);
  	this.savePost();
  	this.emitPost();
  }
  like(post:Post){
  	const indexLike=this.post.findIndex(
  		(PostEl)=>{
  			if (PostEl==post) {
  				return true;
  			}
  		}
  		);
  	this.post[indexLike].like=this.post[indexLike].like+1;
  	this.savePost();
  	this.emitPost();
  }
  removePost(post:Post){
  	const postIndexToRemove=this.post.findIndex(
  		(PostEl)=>{
  			if (PostEl===post) {
  				return true;
  			}
  		}
  		);
  	this.post.splice(postIndexToRemove,1);
  	this.savePost();
  	this.emitPost();
  }
  uploadFile(file:File){
  	return new Promise(
  		(resolve,reject)=>{
  			const AlmostUniqueFileName=Date.now().toString();
  			const uplaod= firebase.storage().ref().child('/images'+AlmostUniqueFileName+file.name).put(file);
  			uplaod.on(firebase.storage.TaskEvent.STATE_CHANGED,
  				()=>{
  					console.log('uploading...');
  				},
  				(error)=>{
  					console.log('error :' + error)
  				},
  				()=>{
  					//console.log('file uploded !');
  					resolve(uplaod.snapshot.ref.getDownloadURL());
  				});
  		}
  	);
  }


}
