import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule,Router,Routes } from '@angular/router';
// import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { TemplateComponent } from './template/template.component';
import { CustomersComponent } from './customers/customers.component';
import { ProfileComponent } from './profile/profile.component';
import { PointsComponent } from './points/points.component';
import { RewardsComponent } from './rewards/rewards.component';

const myRoots: Routes = [
  { path: '', component: TemplateComponent, pathMatch: 'full' , canActivate: 
  [AuthGuard]},
  { path: 'login', component: LoginComponent},
  // { path: 'home', component: TemplateComponent, canActivate: [AuthGuard]},
  { path: 'home', component: TemplateComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
    ]},
  { path: 'customers', component: TemplateComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: CustomersComponent },
    ]},
  { path: 'profile', component: TemplateComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: ProfileComponent },
    ]},
  { path: 'points', component: TemplateComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: ProfileComponent },
    ]},
  { path: 'rewards', component: TemplateComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: ProfileComponent },
    ]},

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingComponent,
    LoginComponent,
    TemplateComponent,
    CustomersComponent,
    ProfileComponent,
    PointsComponent,
    RewardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(
      myRoots,
      { enableTracing: true } // <-- debugging purposes only
    )  
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
