import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies-service';
import { Movie } from '../../interfaces/movie-response';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies-list-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './movies-list-component.html',
  styleUrl: './movies-list-component.css',
})
export class MoviesListComponent {
  [x: string]: any;
  movies: Movie[] = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe((resp) => {
      if (resp.results && resp.results) {
        this.movies = resp.results;
      }
    });
  }
}
