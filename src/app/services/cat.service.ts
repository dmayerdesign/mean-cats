import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { SearchService } from './search.service';

@Injectable()
export class CatService {

	constructor(
				private http:Http,
				private search:SearchService) {	}

	loadCats(text?:string, limit?:number, offset?:number) {
		return this.search.loadSearchableData("/cats/get", text, limit, offset);
	}

}