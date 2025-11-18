import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiKey = "0a85bb496bbb205bee58c5768e27489f";
  baseUrl="/api";

  constructor(private http: HttpClient){}

  getMovies(): Observable<MovieResponse>{
    return this.http.get<MovieResponse>(`${this.baseUrl}/movies?apiKey=${this.apiKey}`);
  }
}

