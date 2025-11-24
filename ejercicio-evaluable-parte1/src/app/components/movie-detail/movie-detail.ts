import { Component } from '@angular/core';
import { Movie, MoviePopularResponse } from '../../interfaces/movie-popular-response';
import { ActivatedRoute } from '@angular/router';
import { HomePageService } from '../../services/home-page-service';
import { Result } from '../../interfaces/people-popular-response';

@Component({
  selector: 'app-movie-detail',
  imports: [],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail {
  movie?: Movie;

  constructor(private route: ActivatedRoute, private movieService: HomePageService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.movieService.getMoviePopularDetail(id).subscribe((resp: MoviePopularResponse) => {
      const movieId = Number(id);
      const found = resp.results?.find((m: Movie) => m.id === movieId);
      this.movie = found;
    });
  }
}
