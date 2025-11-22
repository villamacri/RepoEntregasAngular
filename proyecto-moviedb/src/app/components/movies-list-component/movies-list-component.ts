import { Component, OnInit } from '@angular/core';
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
export class MoviesListComponent implements OnInit{
  [x: string]: any;
  movies: Movie[] = [];

  constructor(private movieService: MoviesService) {}

  //Este método trabaja con el token directamente para traer las respuestas de las solicitudes
  ngOnInit(): void {
    this.movieService.getMoviesByToken().subscribe((resp)=>{
      this.movies=resp.results;
    })
  }
  /*
  //Este método trabaja con una api_key para traer las respuestas de las solicitudes.
  ngOnInit() {
    this.movieService.getMovies().subscribe((resp) => {
        this.movies = resp.results;
    });
  }
  */
}
