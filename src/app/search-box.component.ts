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

	submitSearch($event) {
		if ($event.keyCode === 13) { this.update.emit($event.target.value) }
	}
}