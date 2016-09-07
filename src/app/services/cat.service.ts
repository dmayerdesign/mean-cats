import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CatService {

	constructor(
				private http: Http) {	}

	loadCats() {
		return this.http.get("/cats").map(res => res.json());
	}

}