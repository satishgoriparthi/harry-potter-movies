import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieService } from './services/movie.service';
import { MovieFilterService } from './services/movie-filter.service';

@NgModule({
   imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule],
  declarations: [ AppComponent, MoviesComponent, MovieDetailsComponent ],
  providers: [MovieService, MovieFilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
