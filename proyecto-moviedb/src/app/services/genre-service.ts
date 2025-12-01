import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenreResponse } from '../interfaces/genre-response';

@Injectable({
  providedIn: 'root',
})
export class GenreService {

  baseUrl="https://api.themoviedb.org/3";
  constructor(private http: HttpClient){}

  getGenres(tipo: 'movie' | 'tv' = 'movie'): Observable<GenreResponse>{
    return this.http.get<GenreResponse>(this.baseUrl + `/genre/${tipo}/list`);
  }

}
