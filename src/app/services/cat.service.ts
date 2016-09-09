import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Injectable()
export class CatService {

	constructor(
				private http: Http) {	}

	loadCats(text?:string, limit?:number, offset?:number) {
		let params: URLSearchParams = new URLSearchParams();
		params.set("search", text);
		params.set("show", typeof limit === "number" && limit.toString());
		params.set("offset", typeof offset === "number" && offset.toString());
		
		if (text && text.length) {
			localStorage.setItem("searching", "true");
		}
		else {
			localStorage.setItem("searching", "false");
		}

		return this.http.get("/cats/get/", {
			search: params
		}).map(res => res.json());
	}

}