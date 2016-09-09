import { NgModule, Injectable } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AboutComponent } from './about.component';
import { LibraryComponent } from './library.component';
import { HomeComponent } from './home.component';
import { SearchBox } from './search-box.component.ts';

import { UserService } from './services/user.service';
import { SearchService } from './services/search.service';

import { HighlightDirective } from './directives/highlight.directive';

import { enableProdMode } from '@angular/core';
enableProdMode();

const routing = RouterModule.forRoot([
    { path: '',      component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'library', component: LibraryComponent }
]);

@NgModule({
    imports: [
      BrowserModule,
      routing,
      HttpModule,
      FormsModule,
      ReactiveFormsModule
    ],
    declarations: [
      AppComponent,
      AboutComponent,
      LibraryComponent,
      HomeComponent,
      HighlightDirective
    ],
    providers: [Title, UserService, SearchBox, SearchService],
    bootstrap: [AppComponent]
})

export class AppModule { }