import { Component, OnInit } from '@angular/core';
import { PaynitApiService } from '../paynit-api.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {
	isLoading = false;
	showBox = false;
	points;

	constructor(private paynitApi: PaynitApiService) { }

	ngOnInit() {
	}

	// showAddBox() {
	// 	this.showBox = true;
	// }

	// addItem() {
	// 	console.log('addd');
	// }
}
