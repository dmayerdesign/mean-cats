import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CatService {

	constructor(
				private http: Http) {	}

	loadCats(limit?:number) {
		if (typeof limit === "number")
			return this.http.get("/cats?show=" + limit).map(res => res.json())
		else
			return this.http.get("/cats").map(res => res.json())
	}

	searchCats(search?:string) {
		if (search.length)
			return this.http.get("/cats/search/" + search + "?show=10").map(res => res.json())
		else
			return this.http.get("/cats?show=10").map(res => res.json())
	}

}