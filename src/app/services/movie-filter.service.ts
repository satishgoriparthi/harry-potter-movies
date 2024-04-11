import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MovieData } from '../models/movie-data.model';

@Injectable({
  providedIn: 'root'
})
export class MovieFilterService {

  private moviesSource = new BehaviorSubject<MovieData[]>([]);
  movies$ = this.moviesSource.asObservable();
  private filteredMoviesSource = new BehaviorSubject<MovieData[]>([]);
  filteredMovies$ = this.filteredMoviesSource.asObservable();

  constructor() { }

  setMovies(movies: MovieData[]): void {
    this.moviesSource.next(movies);
  }

  filterByTitle(title: string): void {
    const currentMovies = this.moviesSource.getValue();
    if (!title || title.trim() === '') {
      // If the title is empty or whitespace, emit the original list of movies
      this.moviesSource.next(currentMovies);
      return;
    }
    const filteredMovies = currentMovies.filter(movie =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
    // Update the moviesSource with filtered movies
    this.moviesSource.next(filteredMovies);
  }

  filterByReleaseYear(releaseYear: number): void {
    const currentMovies = this.moviesSource.getValue();
    if (!releaseYear) {
      this.moviesSource.next(currentMovies);
      return;
    }
    const filteredMovies = currentMovies.filter(movie =>
      movie.releaseYear === releaseYear
    );
    this.moviesSource.next(filteredMovies);
  }

  filterMovies(titleFilter: string, releaseYearFilter: number | null): MovieData[] {
  const currentMovies = this.moviesSource.getValue();
  console.log('currentMovies: ', currentMovies);
  const filteredMovies = currentMovies.filter(movie => {
    const titleMatch = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
    const yearMatch = releaseYearFilter === null || releaseYearFilter === undefined || movie.release_date.includes(releaseYearFilter.toString());
    return titleMatch && yearMatch;
  });
  this.filteredMoviesSource.next(filteredMovies);
  return filteredMovies;
}

}
