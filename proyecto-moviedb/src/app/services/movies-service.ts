import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  
  API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTg1YmI0OTZiYmIyMDViZWU1OGM1NzY4ZTI3NDg5ZiIsIm5iZiI6MTc2MzM2NzY4My43MTI5OTk4LCJzdWIiOiI2OTFhZGIwM2E2YTU5N2JmOWY2ZDkyZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dP4DqUP92sOPJ3yFn1T9pDyzFzfwK8UG8PlcdMrinL0";
  headers = {'Authorization': `Bearer ${this.API_TOKEN}`};

  apiKey = "0a85bb496bbb205bee58c5768e27489f";
  baseUrl="https://api.themoviedb.org/3";

  constructor(private http: HttpClient){}

  getMoviesByToken(): Observable<MovieResponse>{
    return this.http.get<MovieResponse>(this.baseUrl + '/movie/popular',{headers : this.headers});
  }

  /*
  getMovies(): Observable<MovieResponse>{
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
  }
  */
}

