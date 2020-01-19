import { Component, OnInit } from '@angular/core';
import { PaynitApiService } from '../paynit-api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
	entityMember;
	isLoading = true;
	
	constructor(private paynitApi: PaynitApiService) { }

	ngOnInit() {
		this.paynitApi.getMember().then(data => {
			this.entityMember = data;
			console.log('user member:',this.entityMember);
			this.isLoading = false;
		}).catch(error => {
			this.isLoading = false;
			console.log(error);
		});
	}

}
