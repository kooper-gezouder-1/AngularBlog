import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Blog';
  constructor(){
  	 var firebaseConfig = {
    apiKey: "AIzaSyA7JlfFJntvTFS0tkd6Amsey1hyTNr7MaI",
    authDomain: "blog-6400e.firebaseapp.com",
    databaseURL: "https://blog-6400e.firebaseio.com",
    projectId: "blog-6400e",
    storageBucket: "blog-6400e.appspot.com",
    messagingSenderId: "42283320946",
    appId: "1:42283320946:web:c63079082282768d2f24eb",
    measurementId: "G-TG87MWZ8FX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  }
}
