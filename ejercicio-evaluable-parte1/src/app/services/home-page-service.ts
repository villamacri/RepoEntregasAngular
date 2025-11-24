import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeoplePopularResponse } from '../interfaces/people-popular-response';
import { MoviePopularResponse } from '../interfaces/movie-popular-response';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  baseUrl = 'https://api.themoviedb.org/3';

  private http = inject(HttpClient);

  getPeoplePopular(): Observable<PeoplePopularResponse> {
    return this.http.get<PeoplePopularResponse>(this.baseUrl + '/person/popular');
  }

  getMoviePopular(): Observable<MoviePopularResponse> {
    return this.http.get<MoviePopularResponse>(this.baseUrl + '/movie/popular');
  }
}
