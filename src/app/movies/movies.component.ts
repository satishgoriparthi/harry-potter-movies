import { Component, OnInit } from '@angular/core';
import { MovieData } from '../models/movie-data.model';
import { MovieService } from '../services/movie.service';
import { MovieFilterService } from '../services/movie-filter.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit{
  movies: MovieData[] = [];
  filteredMovies: MovieData[] = [];
  titleFilter: string = '';
  releaseYearFilter: number | null = null;

  constructor(private movieService: MovieService, private movieFilterService: MovieFilterService) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getAllMovies().subscribe(movies => {
      this.movies = movies;
      this.movieFilterService.setMovies(movies);
      console.log('titleFilter: ',this.titleFilter, 'releaseYearFilter: ', this.releaseYearFilter);
    });
  }

  applyTitleFilter(title: string): void {
    console.log('Entered applyTitleFilter with title: ',title);
    this.titleFilter = title;
    this.filterMovies();
  }

  applyReleaseYearFilter(releaseYear: string): void {
  const year: number | null = releaseYear ? parseInt(releaseYear, 10) : null;
  this.releaseYearFilter = year;
  this.filterMovies();
  }

  filterMovies(): void {
    console.log('Entered filterMovies with title: ',this.titleFilter, this.releaseYearFilter);
    this.filteredMovies = this.movieFilterService.filterMovies(this.titleFilter, this.releaseYearFilter);
  }

  formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  }


}
