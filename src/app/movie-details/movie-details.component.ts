import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieData } from '../models/movie-data.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieId: string = "";
  movie: MovieData | null = null;
  errorMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['movieId'];
      this.getMovieDetails(this.movieId);
    });
  }

  getMovieDetails(movieId: string): void {
    this.movieService.getMovieDetails(movieId).subscribe(
      (data) => {
        console.log('Received forecast data:', data);
        this.movie = data;
      },
      error => {
        this.errorMessage = 'Error fetching movie details.';
        console.error(this.errorMessage);
      }
    );
  }

  formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  }

  goBack(): void {
    this.router.navigate(['/movies']);
  }
}
