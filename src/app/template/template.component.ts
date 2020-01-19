import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as moment from 'jalali-moment';

import { PaynitApiService } from '../paynit-api.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
	page;// = 'home';
	notLogin = true;
	title;
	items = [
		{'name': 'صفحه اصلی' , 'component': 'home', 'icon': 'home'},
		{'name': 'امتیازدهی' , 'component': 'points', 'icon': 'coins'},
		{'name': 'جوایز' , 'component': 'rewards', 'icon': 'award'},
		{'name': 'مشتریان' , 'component': 'customers', 'icon': 'users'},
		// {'name': 'گزارشات' , 'component': 'test4', 'icon': 'chart-line'},
		// {'name': 'مالی' , 'component': 'test5', 'icon': 'money-bill-wave'}
	];
	pageName;// = this.items[0].name;
	showDrop = false;
	entityData;
	today = moment().locale('fa').format('YYYY/M/D');
	todayTime: number = Date.now();

  	constructor(private myRoute: Router,
  			  private auth: AuthService,
  			  private paynitApi: PaynitApiService) { 
  		console.log(this.myRoute.url);
	  	this.paynitApi.getEntity().then(data => {
	  		console.log('entity data:',data);
	  		this.entityData = data['data'];
	  	}).catch(error => {
	  		console.log(error);
	  	});
		switch (this.myRoute.url) {
	        case '/':
		  		this.page = 'home';
		  		this.pageName = 'صفحه اصلی';
	            break;
	        case '/home':
		  		this.page = 'home';
		  		this.pageName = 'صفحه اصلی';
	            break;
	        case '/customers':
		  		this.page = 'customers';
		  		this.pageName = 'مشتریان';
	            break;
	        case '/profile':
		  		this.page = 'profile';
		  		this.pageName = 'پروفایل';
	            break;
	        case '/points':
		  		this.page = 'points';
		  		this.pageName = 'امتیازدهی';
	            break;
	        case '/rewards':
		  		this.page = 'rewards';
		  		this.pageName = 'جوایز';
	            break;
	        default:

	    }
	    this.clock();
  	}

  	ngOnInit() {
  	}

  	clock() {
	    setInterval(() => {
	      this.todayTime = Date.now();
	    },1000)
	}
  
  	goToPage(item) {
		console.log('line 31',this.myRoute.url);
		this.page = item.component;
		this.pageName = item.name;
		// this.myRoute.url = item.component;
		this.myRoute.navigate([`${this.page}`]);
		// this.myRoute.snapshot.params[`${item.component}`];
  	}

  	goToProfile() {
		this.page = 'profile';
		this.pageName = 'پروفایل';
		this.showDrop = false;
		this.myRoute.navigate([`${this.page}`]);
  	}

  	showDropDown() {
	    if (this.showDrop) {
			this.showDrop = false;
			let menu = document.getElementsByClassName('drop-down');
			// menu.css({
			//   'background' : 'red'
			// }) 
	    } else {
	      this.showDrop = true;
	    }
  	}

  	logOut() {
		this.auth.logout();
  	}

}
