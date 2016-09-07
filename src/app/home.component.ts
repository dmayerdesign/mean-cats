import { Component, OnInit, ViewChildren, Input, Output } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CatService } from './services/cat.service';
import { UIHelper, Utilities } from './services/app.service';
import { OrderBy } from './pipes/orderby.pipe.ts';
import { AgePipe } from './pipes/age.pipe.ts';
import { SearchPipe } from './pipes/search.pipe.ts';
import { SearchBox } from './search-box.component';

@Component({
	selector: 'home',
	templateUrl: 'app/home.component.html',
	providers: [CatService, UIHelper, Utilities],
	directives: [SearchBox],
	pipes: [OrderBy, AgePipe, SearchPipe]
})

export class HomeComponent implements OnInit {
	@ViewChildren('catsList') $cats;
	@Input() term;
	@Output() set:string = "cats";
	
	private cats = [];
	private cat = {};
	private catsShowing:number;
	private catsFilter = {order:"-name"};

	private ageFilter = "all";

	private isLoading = true;
	private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' }) });

	private isEditing = false;

	private infoMsg = { body: "", type: "info"};

	private addCatForm: FormGroup;
	private name = new FormControl("", Validators.required);
	private age = new FormControl("", Validators.required);
	private weight = new FormControl("", Validators.required);

	private ageFilterRanges:string[] = [
		"all",
		"young",
		"old"
	];

	constructor(
				private http: Http,
				private formBuilder: FormBuilder,
				private catService: CatService,
				private helper: UIHelper,
				private utilities: Utilities) {
	}

	ngDoCheck() {
		this.updateView();
	}

	ngOnInit() {
		this.updateView();

		/** Check for the current order of cats (i.e. the current state of the CatsFilter) **/
		!this.utilities.existsLocally('CatsFilter')
			? localStorage.setItem('CatsFilter', JSON.stringify(this.catsFilter))
			: this.catsFilter = JSON.parse(localStorage['CatsFilter']);

		this.catService.loadCats().subscribe(
			data => {
				this.isLoading = false;
				this.cats = data;
			},
			error => console.log(error)
		);

		this.addCatForm = this.formBuilder.group({
			name: this.name,
			age: this.age,
			weight: this.weight
		});
	}

	submitAdd() {
		this.http.post("/cat", JSON.stringify(this.addCatForm.value), this.options).subscribe(
			res => {
				this.cats.push(res.json()); // the response contains the new item
				this.updateView();
				this.sendInfoMsg("item added successfully.", "success");
				this.addCatForm.reset();
			},
			error => console.log(error)
		);
	}

	enableEditing(cat) {
		this.isEditing = true;
		this.cat = cat;
	}

	cancelEditing() {
		this.isEditing = false;
		this.cat = {};
		this.sendInfoMsg("item editing cancelled.", "warning");
		// reload the cats to reset the editing
		this.catService.loadCats();
	}

	submitEdit(cat) {
		this.http.put("/cat/"+cat._id, JSON.stringify(cat), this.options).subscribe(
			res => {
				this.isEditing = false;
				this.cat = cat;
				this.sendInfoMsg("item edited successfully.", "success");
			},
			error => console.log(error)
		);
	}

	submitRemove(cat) {
		var delOptions = new RequestOptions({
			body: '', // bug of RC5
			headers: new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' })}
		);
		if(window.confirm("Are you sure you want to permanently delete this item?")) {
			this.http.delete("/cat/"+cat._id, delOptions).subscribe(
				res => {
					var pos = this.cats.map((e) => { return e._id }).indexOf(cat._id);
					this.cats.splice(pos, 1);
					this.sendInfoMsg("item deleted successfully.", "success");
					this.updateView();
				},
				error => console.log(error)
			);
		}
	}

	sendInfoMsg(body, type, time = 3000) {
		this.infoMsg.body = body;
		this.infoMsg.type = type;
		window.setTimeout(() => this.infoMsg.body = "", time);
	}



	countCatsShowing() {
		let counterFunc = window.setInterval(() => {
			if (counter() > 0) {
				window.clearInterval(counterFunc); // doesn't work for some reason
			}
		}, 300);

		let counter = ():number => {
			if (this.$cats && this.$cats.toArray() && this.$cats.toArray().length) {
				this.catsShowing = this.$cats.toArray().length;
				return this.catsShowing;
			}
			else {
				return 0;
			}
		}
	}

	updateView() {
		this.helper.setTitle('Total cats: ' + this.cats.length);
		this.countCatsShowing();
	}

	setAgeFilter(range:string) {
		this.ageFilter = range;
	}

	toggleOrder(attr) {
		if (this.catsFilter.order.indexOf(attr) === -1) {
			this.catsFilter.order = '-' + attr;
		}
		else {
			if (this.catsFilter.order.indexOf('-') > -1) {
				this.catsFilter.order = '+' + attr;
			} else {
				this.catsFilter.order = '-' + attr;
			}
		}
		localStorage.setItem('CatsFilter', JSON.stringify(this.catsFilter));
	}

	isAscending(order) {
		if (order.indexOf("+") > -1) {
			return true;
		} else {
			return false;
		}
	}

	contains(a,b) {
		if (a.indexOf(b) > -1) {
			return true;
		} else {
			return false;
		}
	}

}