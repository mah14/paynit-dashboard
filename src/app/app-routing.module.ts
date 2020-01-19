import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

import { LoginComponent } from './login/login.component';
import { TemplateComponent } from './template/template.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
 	// { path: 'login', component: LoginComponent },
  // 	{ path: 'home', component: TemplateComponent },
  // 	{ path: 'customers', component: TemplateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  // isLogin;

  // constructor() {
  //   this.isLogin = localStorage.getItem('isLogin');
  //   console.log('is login', this.isLogin);
  //   // localStorage.clear();
  //   if (this.isLogin == 'true') {
  //   	console.log('red');
  //   	// routes.push({ path: '', redirectTo: '/home', pathMatch: 'full' });
  //   	routes[0].redirectTo = '/login';
  //   } else {
  //   	console.log('blue');
  //   	routes.push({ path: '', redirectTo: '/login', pathMatch: 'full' });
  //   }
  //   routes.push({ path: 'customers', component: TemplateComponent });
  //   console.log(routes);
  // }

}
