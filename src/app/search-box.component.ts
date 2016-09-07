import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'search-box',
	styleUrls: ['app/search-box.component.css'],
	template: `
		<div class="search-box card-block">
			<input #input type="text" (input)="update.emit(input.value)" placeholder='Search {{set}}'>
		</div>`
})
export class SearchBox {
	@Output() update = new EventEmitter();
	@Input() set: string;

	ngOnInit() {
		this.update.emit('');
	}
}