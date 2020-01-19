import { Component } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { TemplateComponent } from './template/template.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogin;

  constructor() {
    this.isLogin = localStorage.getItem('isLogin');
    console.log('is login', this.isLogin);
    // localStorage.clear();
  }

}
