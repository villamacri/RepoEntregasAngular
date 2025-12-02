import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * SERVICIO DE AUTENTICACIÓN
 * Maneja todo el flujo de login/logout con TMDb
 * Flujo: request token → usuario autoriza → crear sesión → obtener account_id
 */
@Injectable({
  providedIn: 'root', // Servicio singleton disponible en toda la app
})
export class AuthService {
  private baseUrl = 'https://api.themoviedb.org/3';

  // HttpClient se inyecta automáticamente para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  /**
   * PASO 1: Obtener request token
   * Este token temporal se usa para que el usuario autorice la app en TMDb
   * @returns Observable con el token en response.request_token
   */
  getRequestToken(): Observable<any> {
    return this.http.get(`${this.baseUrl}/authentication/token/new`);
  }

  /**
   * PASO 2: Crear sesión con el token autorizado
   * Después de que el usuario autoriza en TMDb, usamos el token para crear una sesión
   * @param requestToken - Token autorizado por el usuario
   * @returns Observable con el session_id en response.session_id
   */
  createSession(requestToken: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/authentication/session/new`, {
      request_token: requestToken,
    });
  }

  /**
   * PASO 3: Obtener detalles de la cuenta
   * Con el session_id obtenemos información del usuario (id, nombre, etc.)
   * @param sessionId - ID de sesión obtenido en el paso anterior
   * @returns Observable con los detalles de la cuenta
   */
  getAccountDetails(sessionId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/account`, {
      params: { session_id: sessionId }, // session_id como parámetro de query
    });
  }

  /**
   * Cerrar sesión en el servidor de TMDb
   * Invalida el session_id en el servidor
   * @param sessionId - ID de sesión a eliminar
   * @returns Observable con la respuesta de la operación
   */
  deleteSession(sessionId: string): Observable<any> {
    // http.delete() con body (no todos los DELETE tienen body)
    return this.http.delete(`${this.baseUrl}/authentication/session`, {
      body: { session_id: sessionId },
    });
  }

  /**
   * Verificar si hay una sesión activa localmente
   * Comprueba si existe session_id en localStorage
   * @returns true si está autenticado, false si no
   */
  isAuthenticated(): boolean {
    // !! convierte cualquier valor a boolean (truthy/falsy)
    // null o undefined → false, cualquier string → true
    return !!localStorage.getItem('session_id');
  }

  /**
   * Cerrar sesión localmente
   * Elimina los datos de autenticación del localStorage del navegador
   */
  logout(): void {
    localStorage.removeItem('session_id');
    localStorage.removeItem('account_id');
  }
}
