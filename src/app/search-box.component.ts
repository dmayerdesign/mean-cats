import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'search-box',
	styleUrls: ['app/search-box.component.css'],
	template: `
		<div class="search-box card-block">
			<input type="text" (keydown)="submitSearch($event)" placeholder='Search {{set}}'>
		</div>`
})
export class SearchBox {
	@Output() update = new EventEmitter();
	@Input() set: string;

	typing:boolean;

	submitSearch($event) {
		let search:string = $event.target.value;
		let keyCode:number = $event.keyCode;

		if (search.length === 1 && keyCode === 8)
			this.update.emit("");

		if (keyCode === 13)
			this.update.emit(search);
	}
}