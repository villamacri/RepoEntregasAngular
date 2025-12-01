import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  
  baseUrl="https://api.themoviedb.org/3";

  constructor(private http: HttpClient){}

  getMoviesByGenre(tipo: 'movie' | 'tv', genreId: string): Observable<MovieResponse>{
    
    return this.http.get<MovieResponse>(`${this.baseUrl}/discover/${tipo}`,{
      params: {
        with_genres: genreId
      }
    });
  }

  getPopularMovies(): Observable<MovieResponse>{
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/popular`);
  }

  getTopRatedMovies(): Observable<MovieResponse>{
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/top_rated`);
  }
}

