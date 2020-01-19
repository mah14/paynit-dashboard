import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { PaynitApiService } from '../paynit-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	userPhone;
	loading = false;
	step2 = false;
	userCode = 0;

	constructor(private toastr: ToastrService,
				private auth: AuthService,
				private myRoute: Router,
				private paynitApi: PaynitApiService) { 
	}

	ngOnInit() {
	}

	getLength(e) {
		this.userPhone = e.target.value;
	}
	codeGetLength(e) {
		this.userCode = e.target.value;
	}

	sendPhone() {
		console.log(this.userPhone);
	}
	getCode() {
		if (this.userPhone.length == 11) {
			let msg;
			this.loading = true;
			let params = {
				"mobile": this.userPhone
			};
			this.paynitApi.postPhoneNumber(params).then(data => {
				msg = data['message'];
				console.log(msg);
				this.loading = false;
				this.toastr.success(msg, '',{
				  timeOut: 3000,
				  positionClass: 'toast-top-center'
				});
				this.step2 = true;
			}).catch((error: any) => {
				console.log(error);
				msg = error.msg;
		      	this.loading = false;
				this.toastr.error(msg, '',{
				  timeOut: 3000,
				  positionClass: 'toast-top-center'
				});
				// this.paynitApi.handleError(error, LoginComponent);
	      	});
		}
	}

	sendCode() {
		let msg;
		this.loading = true;
		let params = {
			'mobile': this.userPhone,
			'verification_code': this.userCode
		};
		console.log(params);
		this.paynitApi.postCodeNumber(params).then(data => {
			msg = data['message'];
			console.log(data);
			this.loading = false;
			this.toastr.success(msg, '',{
			  timeOut: 3000,
			  positionClass: 'toast-top-center'
			});
			this.auth.sendToken(data['data']['token']);
			this.myRoute.navigate(['home']);
		}).catch((error: any) => {
	      	this.loading = false;
			msg = error.msg;
	      	this.loading = false;
			this.toastr.error(msg, '',{
			  timeOut: 3000,
			  positionClass: 'toast-top-center'
			});
      	});

	}

}
