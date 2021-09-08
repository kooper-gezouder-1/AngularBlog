import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPostComponent } from './list-post/list-post.component';
import { SinglePostComponent } from './list-post/single-post/single-post.component';
import { FormPostComponent } from './list-post/form-post/form-post.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GardeService } from './services/garde.service';

const appRoutes: Routes=[
{path:'auth/signin',component:SigninComponent},
{path:'auth/signup',component:SignupComponent},
{path:'posts',canActivate:[GardeService],component:ListPostComponent},
{path:'post/single/:id',canActivate:[GardeService],component:SinglePostComponent},
{path:'post/new',canActivate:[GardeService],component:FormPostComponent},
{path:'',redirectTo:'auth/signin', pathMatch:'full'},
{path:'**',redirectTo:'auth/signin' ,pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListPostComponent,
    SinglePostComponent,
    FormPostComponent,
    NavBarComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [
  GardeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
