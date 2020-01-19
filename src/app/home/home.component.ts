import { Component, OnInit } from '@angular/core';
import { PaynitApiService } from '../paynit-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	entityData;
	isLoading = true;
	entityMember;
	entityReward;
	promise1; promise2; promise3;
	rewardCount = 0;
	points = 0;

  	constructor(private paynitApi: PaynitApiService) {
  	}

	ngOnInit() {
	  	this.promise1 = this.paynitApi.getEntity().then(data => {
	  		this.entityData = data['data'];
	  		this.points = this.entityData.points;
	  		console.log('user data:',this.entityData);
	  		// this.isLoading = false;
	  	}).catch(error => {
	  		this.isLoading = false;
	  		console.log(error);
	  	});

	  	this.promise2 = this.paynitApi.getMember().then(data => {
	  		this.entityMember = data;
	  		console.log('user member:',this.entityMember);
	  		// this.isLoading = false;
	  	}).catch(error => {
	  		this.isLoading = false;
	  		console.log(error);
	  	});

	  	this.promise3 = this.paynitApi.getReward().then(data => {
	  		this.entityReward = data['data']['data'];
	  		this.rewardCount = this.entityReward.length;
	  		console.log('user reward:',this.rewardCount);
	  		// this.isLoading = false;
	  	}).catch(error => {
	  		this.isLoading = false;
	  		console.log(error);
	  	});

	  	Promise.all([this.promise1, this.promise2, this.promise3]).then(values => {
		  	console.log('values', values);
		  	this.isLoading = false;
		}).catch(error => {
	  		this.isLoading = false;
	  		console.log(error);
	  	});
	}

}
