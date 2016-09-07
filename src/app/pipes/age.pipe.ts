import { Pipe, PipeTransform } from '@angular/core';
import { UIHelper, Utilities } from '../services/app.service';

@Pipe({ name: 'age', pure: false })

export class AgePipe implements PipeTransform {
	newCats = [];
  transform(cats, [config = "young"]):any {
  	if (config == "old")
    	this.newCats = cats.filter(cat => cat.age > 10);
    else if (config == "young")
    	this.newCats = cats.filter(cat => cat.age <= 10);
    else
    	this.newCats = cats;

    return this.newCats;
  }
}