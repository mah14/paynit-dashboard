import { Component, OnInit } from '@angular/core';
import { PaynitApiService } from '../paynit-api.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
	isLoading = true;
	showBox = false;
	rewards;
	
	constructor(private paynitApi: PaynitApiService) { }

	ngOnInit() {
	  	this.paynitApi.getReward().then(data => {
	  		this.rewards = data['data']['data'];
	  		console.log('rewards:',this.rewards);
	  		this.isLoading = false;
	  	}).catch(error => {
	  		this.isLoading = false;
	  		console.log(error);
	  	});
	}

	showAddBox() {
		this.showBox = true;
	}

	addItem() {
		console.log('addd');
	}
}
