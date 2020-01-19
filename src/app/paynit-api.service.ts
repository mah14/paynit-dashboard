import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaynitApiService {
	private baseURL = 'https://www.paynit.app/api/v1/panel/';
	private header;
	options;
	token;

	constructor(private http: HttpClient,
				private auth: AuthService) { }

	setToken() {
		this.token = this.auth.getToken();
		console.log('....... >',this.token);
		this.header = new HttpHeaders({
			'Accept': 'application/json',
			'Authorization': `Bearer ${this.token}`
		});
		this.options = { headers: this.header };
		console.log(this.options);
	} 
//  post API
	postApi(apiUrl,params){
		this.setToken();
		return new Promise((resolve, reject) => {			
			this.http.post(apiUrl,params,this.options)
				.subscribe(res => {
					resolve(res);
				}, (err) => {
					let errorMessages = this.errorHandling(err);
			        reject(errorMessages);
			  		console.log('error: ',err);
			    }); 
		});
	}
//  get API
	getApi(apiUrl) {
		this.setToken();
		return new Promise((resolve, reject) => {			
			this.http.get(apiUrl,this.options)
				.subscribe(res => {
					resolve(res);
				}, (err) => {
					let errorMessages = this.errorHandling(err);
			        reject(errorMessages);
			  		console.log('error: ',err);
			    }); 
		});		
	}
//  checking user's phone number
	postPhoneNumber(params) {
		return this.postApi(this.baseURL+'login',params);	
	}
//  checking code that sending by sms 
	postCodeNumber(params) {
		return this.postApi(this.baseURL+'validate',params);	
	}

	getUser() {
		return this.getApi(this.baseURL+'user');	
	}

	getEntity() {
		return this.getApi(this.baseURL+'entity');	
	}

	getMember() {
		return this.getApi(this.baseURL+'member');	
	}

	getMemberDtls(id) {
		return this.getApi(this.baseURL+'member/'+id);	
	}

	getMemberPoints(id) {
		return this.getApi(this.baseURL+'member/'+id+'/point');	
	}

	getReward() {
		return this.getApi(this.baseURL+'reward');	
	}

	errorHandling(err){
		switch (err.status){
			case 422:
				var errorsArray = err.error.errors;
				console.log(errorsArray);
				var messages = [];
				for (var key in errorsArray) {
				    if (errorsArray.hasOwnProperty(key)) {
				    	for (var i = errorsArray[key].length - 1; i >= 0; i--) {
				    		messages.push(errorsArray[key][i]);
				    	}
				        
				    }
				}
				console.log(messages);
				return { 'status': err.status, 'msg': messages.join('\n') };

			case 404:
				return { 'status': err.status, 'msg': err.error.message }; //console.log(err.json().message)
			
			case 406:
				return { 'status': err.status, 'msg': err.error.message };
			
			case 403:
				return { 'status': err.status, 'msg': err.error.message };
			
			case 401:
				return { 'status': err.status, 'msg': err.error.message };
			case 405:
				return { 'status': err.status, 'msg': err.error.message };//'Method Not Allowed';
			case 500:
				return { 'status': err.status, 'msg': err.error.message };//'Server Error';


		}
	}
}
