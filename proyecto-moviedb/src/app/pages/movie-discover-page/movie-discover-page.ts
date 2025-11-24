import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenreResponse } from '../../interfaces/genre-response';
import { GenreService } from '../../services/genre-service';

@Component({
  selector: 'app-movie-discover-page',
  imports: [ReactiveFormsModule],
  templateUrl: './movie-discover-page.html',
  styleUrl: './movie-discover-page.css',
})
export class MovieDiscoverPage implements OnInit {
  genresMovieList: GenreResponse[] = [];
  genreMovieSearch = new FormControl('', Validators.required);

  constructor(private genresService: GenreService) {}

  ngOnInit(): void {
    this.genresService.getGenres().subscribe((resp) => {
      this.genresMovieList = resp.genres;
    });
  }

  searchMovies() {
    if (this.genreMovieSearch.value == '') {
      this.movieList = [];
    }
  }

  getSubStr(text: string) {
    return text.length > 50 ? text.substring(0, 49) + '...' : text;
  }

  getImageUrl(posterPath: string) {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }
}
