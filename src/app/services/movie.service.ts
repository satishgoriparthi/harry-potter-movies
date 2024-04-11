import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieData } from '../models/movie-data.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = '/movies'; 

  constructor(private http: HttpClient) { }

  //get all movies to display on the landing page
  getAllMovies(): Observable<MovieData[]> {
    return this.http.get<MovieData[]>(this.apiUrl);
  }

  getMovieDetails(movieId: string): Observable<MovieData> {
    return this.http.get<MovieData>(`${this.apiUrl}/${movieId}`);
  }
}
