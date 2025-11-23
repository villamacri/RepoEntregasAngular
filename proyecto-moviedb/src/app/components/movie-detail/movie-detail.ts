import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies-service';
import { Movie } from '../../interfaces/movie-response';

@Component({
  selector: 'app-movie-detail',
  imports: [],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail {

  movie?: Movie 

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.movieService.getMovieById(id).subscribe(movie => {
      this.movie = movie
    })
  }
}
