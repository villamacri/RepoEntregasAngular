import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieResponse } from '../interfaces/movie-response';

// @Injectable: Marca esta clase como un servicio que puede ser inyectado en componentes
// providedIn: 'root' hace que el servicio sea un singleton disponible en toda la app
@Injectable({
  providedIn: 'root',
})
export class MoviesService {

  // URL base de la API de The Movie Database
  baseUrl = "https://api.themoviedb.org/3";

  // Constructor: HttpClient se inyecta automáticamente para hacer peticiones HTTP
  // Los headers de autenticación se añaden automáticamente por el interceptor
  constructor(private http: HttpClient) { }

  /**
   * PETICIÓN GET CON PARÁMETROS DE BÚSQUEDA
   * Busca películas o series por género
   * @param tipo - 'movie' o 'tv' para buscar películas o series
   * @param genreId - ID del género a filtrar
   * @returns Observable con la respuesta que contiene un array de películas/series
   */
  getMoviesByGenre(tipo: 'movie' | 'tv', genreId: string): Observable<MovieResponse> {
    // http.get<T>: Petición GET tipada, devuelve Observable<MovieResponse>
    // Template literals (`${}`): Forma moderna de concatenar strings
    // params: Objeto con parámetros de query (?with_genres=xxx)
    return this.http.get<MovieResponse>(`${this.baseUrl}/discover/${tipo}`, {
      params: {
        with_genres: genreId
      }
    });
  }

  /**
   * PETICIÓN GET SIMPLE
   * Obtiene las películas más populares
   * @returns Observable con la respuesta de películas populares
   */
  getPopularMovies(): Observable<MovieResponse> {
    // Petición GET básica sin parámetros adicionales
    // El interceptor añade el header Authorization automáticamente
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/popular`);
  }

  /**
   * PETICIÓN GET SIMPLE
   * Obtiene las películas mejor valoradas
   * @returns Observable con la respuesta de películas top rated
   */
  getTopRatedMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/top_rated`);
  }

  /**
   * PETICIÓN POST PARA MODIFICAR LISTAS (requiere session_id)
   * Añade una película a una lista del usuario
   * @param listId - ID de la lista donde añadir la película
   * @param movieId - ID de la película a añadir
   * @returns Observable con la respuesta de la operación
   */
  addMovieToList(listId: string, movieId: number): Observable<any> {
    // Obtener session_id del localStorage (guardado al hacer login)
    const sessionId = localStorage.getItem('session_id');
    
    // Body de la petición POST: contiene el ID de la película
    const body = {
      media_id: movieId
    };

    // http.post(url, body, opciones): Envía petición POST
    // params: Añade session_id como parámetro de query
    return this.http.post(`${this.baseUrl}/list/${listId}/add_item`, body, {
      params: { session_id: sessionId || '' }
    });
  }

  /**
   * PETICIÓN POST PARA MODIFICAR LISTAS (requiere session_id)
   * Elimina una película de una lista del usuario
   * @param listId - ID de la lista de donde eliminar la película
   * @param movieId - ID de la película a eliminar
   * @returns Observable con la respuesta de la operación
   */
  removeMovieFromList(listId: string, movieId: number): Observable<any> {
    // Obtener session_id del localStorage (guardado al hacer login)
    const sessionId = localStorage.getItem('session_id');
    
    const body = {
      media_id: movieId
    };

    // Añadir session_id como parámetro de query
    return this.http.post(`${this.baseUrl}/list/${listId}/remove_item`, body, {
      params: { session_id: sessionId || '' }
    });
  }

}

