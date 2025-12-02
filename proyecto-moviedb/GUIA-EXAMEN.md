# 📚 GUÍA COMPLETA PARA EL EXAMEN - TU PROYECTO MovieDB

## 📋 ÍNDICE
1. [Estado completo de tu proyecto](#estado-completo-de-tu-proyecto-)
2. [Peticiones GET - Código de tu proyecto](#1-peticiones-get---código-de-tu-proyecto)
3. [Interceptors - Código de tu proyecto](#2-interceptors---código-de-tu-proyecto)
4. [Búsquedas con parámetros](#3-búsquedas-con-parámetros)
5. [Session y modificación de listas](#4-session-y-modificación-de-listas)
6. [Navegación y componentes](#6-navegación-y-componentes)
7. [Checklist final](#7-checklist-final)

---

## Estado completo de tu proyecto ✅

### 🎉 LO QUE TIENES 100% FUNCIONAL:

#### **1. Servicios completos y comentados:**
- ✅ `movies-service.ts` - Peticiones GET y POST con session_id
- ✅ `auth-service.ts` - Flujo completo de autenticación
- ✅ `account-service.ts` - Obtener listas del usuario
- ✅ `genre-service.ts` - Obtener géneros

#### **2. Interceptors:**
- ✅ `api-key-interceptor.ts` - Añade Bearer token automáticamente
- ✅ `logging-interceptor.ts` - Debug de URLs

#### **3. Páginas:**
- ✅ `login-page` - Login con Bootstrap y sintaxis moderna (@if)
- ✅ `user-lists-page` - Muestra listas con @if y @for
- ✅ `movie-discover-page` - Búsquedas por género

#### **4. Componentes:**
- ✅ `navbar` - Navegación con RouterLink y estado de auth

#### **5. Configuración:**
- ✅ Rutas configuradas en `app.routes.ts`
- ✅ Interceptors registrados en `app.config.ts`
- ✅ Bootstrap 5 instalado y funcionando

---

## 1. PETICIONES GET - Código de tu proyecto

### 🎯 Concepto clave
Las peticiones GET se usan para **OBTENER datos** del servidor sin modificarlos.

### 📝 TU CÓDIGO REAL en `movies-service.ts`

```typescript
/**
 * PETICIÓN GET SIMPLE
 * Obtiene las películas más populares
 */
getPopularMovies(): Observable<MovieResponse> {
  // Petición GET básica sin parámetros adicionales
  // El interceptor añade el header Authorization automáticamente
  return this.http.get<MovieResponse>(`${this.baseUrl}/movie/popular`);
}

/**
 * PETICIÓN GET SIMPLE
 * Obtiene las películas mejor valoradas
 */
getTopRatedMovies(): Observable<MovieResponse> {
  return this.http.get<MovieResponse>(`${this.baseUrl}/movie/top_rated`);
}

/**
 * PETICIÓN GET CON PARÁMETROS DE BÚSQUEDA
 * Busca películas o series por género
 * @param tipo - 'movie' o 'tv' para buscar películas o series
 * @param genreId - ID del género a filtrar
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
```

### 📝 Cómo se usa en TU COMPONENTE `movie-discover-component.ts`

```typescript
export class MovieDiscoverComponent implements OnInit {
  private moviesService = inject(MoviesService);
  
  results: any[] = [];
  tipoSeleccion: 'movie' | 'tv' = 'movie';
  seleccionIdGeneros: string = '';

  search(): void {
    // Llamar al servicio y suscribirse al Observable
    this.moviesService.getMoviesByGenre(this.tipoSeleccion, this.seleccionIdGeneros).subscribe({
      next: (resp: any) => {
        // next: Se ejecuta cuando la petición es exitosa
        this.results = resp.results;
      },
      error: (err) => console.error('Error buscando:', err)
    });
  }
}
```

### 📝 Uso en el componente

```typescript
export class MiComponente implements OnInit {
  private miServicio = inject(MiServicio);
  
  datos: any[] = [];
  
  ngOnInit(): void {
    this.cargarDatos();
  }
  
  cargarDatos(): void {
    this.miServicio.getDatos().subscribe({
      next: (response) => {
        this.datos = response.results;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
```

### ⚠️ Errores comunes
- ❌ Olvidar el tipado genérico: `http.get(url)` → ✅ `http.get<Tipo>(url)`
- ❌ No suscribirse al Observable (la petición no se ejecuta)
- ❌ No manejar errores con `error: (err) => {...}`

---

## 2. INTERCEPTORS - Código de tu proyecto

### 🎯 Concepto clave
Los interceptors **interceptan todas las peticiones HTTP** para modificarlas antes de enviarlas (añadir headers, logs, etc.)

### 📝 TU CÓDIGO REAL en `api-key-interceptor.ts`

```typescript
import { HttpInterceptorFn } from '@angular/common/http';

// Token Bearer de TMDb para autenticar todas las peticiones a la API
// Este token se obtiene desde tu cuenta de TMDb (Settings → API → Read Access Token)
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTg1YmI0OTZiYmIyMDViZWU1OGM1NzY4ZTI3NDg5ZiIsIm5iZiI6MTc2MzM2NzY4My43MTI5OTk4LCJzdWIiOiI2OTFhZGIwM2E2YTU5N2JmOWY2ZDkyZGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dP4DqUP92sOPJ3yFn1T9pDyzFzfwK8UG8PlcdMrinL0'

/**
 * INTERCEPTOR DE AUTENTICACIÓN
 * Este interceptor funcional se ejecuta automáticamente en TODAS las peticiones HTTP
 * @param req - La petición HTTP original
 * @param next - Función para continuar con la petición (modificada o no)
 * @returns Observable con la respuesta HTTP
 */
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  // req.clone(): Crea una copia de la petición (las peticiones son inmutables)
  // headers.set(): Añade el header Authorization con el Bearer token
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${API_TOKEN}`),
  });
  
  // next(reqWithHeader): Continúa con la petición modificada
  // Esto envía la petición al servidor con el header de autenticación
  return next(reqWithHeader);
};
```

### 📝 TU CÓDIGO en `logging-interceptor.ts`

```typescript
import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.url); // Muestra en consola la URL de cada petición
  return next(req);
};
```

### 📝 TU CÓDIGO en `app.config.ts` (REGISTRO)

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiKeyInterceptor } from './interceptors/api-key-interceptor';
import { loggingInterceptor } from './interceptors/logging-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      // withInterceptors([...]) registra los interceptors en orden
      // Se ejecutan en el orden del array para requests
      withInterceptors([apiKeyInterceptor, loggingInterceptor]),
    ),
    // ... otros providers
  ]
};
```

### ✅ Ventajas de TU implementación
- ✅ No necesitas añadir headers manualmente en cada petición
- ✅ Código más limpio y centralizado
- ✅ Fácil de mantener (cambias el token en un solo lugar)
- ✅ El logging te ayuda a debuggear en desarrollo

### ✅ Ventajas
- No necesitas añadir headers manualmente en cada petición
- Código más limpio y centralizado
- Fácil de mantener y modificar

### ⚠️ Errores comunes
- ❌ Olvidar registrar el interceptor en `app.config.ts`
- ❌ No usar `req.clone()` (las peticiones son inmutables)
- ❌ No devolver `next(req)` o `next(reqModificada)`

---

## 3. BÚSQUEDAS CON PARÁMETROS

### 🎯 Concepto clave
Usar parámetros de query (`?param=valor`) para filtrar resultados.

### 📝 En el servicio

```typescript
// Búsqueda con UN parámetro
buscarPorGenero(genreId: string): Observable<MovieResponse> {
  return this.http.get<MovieResponse>(`${this.baseUrl}/discover/movie`, {
    params: {
      with_genres: genreId
    }
  });
}

// Búsqueda con MÚLTIPLES parámetros
buscarAvanzada(termino: string, año: number, page: number): Observable<MovieResponse> {
  return this.http.get<MovieResponse>(`${this.baseUrl}/search/movie`, {
    params: {
      query: termino,
      year: año.toString(),
      page: page.toString()
    }
  });
}
```

### 📝 En el componente con formulario

```typescript
export class BuscadorComponent {
  private moviesService = inject(MoviesService);
  
  // Variables del formulario (usa FormsModule con [(ngModel)])
  genreIdSeleccionado: string = '';
  resultados: any[] = [];
  
  buscar(): void {
    if (this.genreIdSeleccionado) {
      this.moviesService.buscarPorGenero(this.genreIdSeleccionado).subscribe({
        next: (response) => {
          this.resultados = response.results;
        },
        error: (err) => console.error('Error en búsqueda:', err)
      });
    }
  }
  
  // Método que se ejecuta cuando cambia el select
  onGenreChange(genreId: string): void {
    this.genreIdSeleccionado = genreId;
    this.buscar();
  }
}
```

### 📝 En el HTML

```html
<!-- Select para elegir género -->
<select [(ngModel)]="genreIdSeleccionado" (change)="buscar()">
  <option value="">Selecciona un género</option>
  <option *ngFor="let genre of generos" [value]="genre.id">
    {{ genre.name }}
  </option>
</select>

<!-- Mostrar resultados -->
<div *ngFor="let movie of resultados">
  <h3>{{ movie.title }}</h3>
  <p>{{ movie.overview }}</p>
</div>
```

### ⚠️ Errores comunes
- ❌ Poner params directamente en la URL: `url?param=valor` → ✅ Usar objeto `params`
- ❌ No convertir números a string en params
- ❌ Olvidar importar `FormsModule` para usar `[(ngModel)]`

---

## 4. SESSION Y MODIFICACIÓN DE LISTAS

### 🎯 Concepto clave
Para modificar datos del usuario (añadir/eliminar de listas) necesitas:
1. **session_id**: Identificador de sesión del usuario autenticado
2. **account_id**: ID de la cuenta del usuario
3. Peticiones **POST** con el `session_id` como parámetro

### 📝 TU CÓDIGO COMPLETO en `auth-service.ts`

```typescript
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

  constructor(private http: HttpClient) {}

  /**
   * PASO 1: Obtener request token
   * Este token temporal se usa para que el usuario autorice la app en TMDb
   */
  getRequestToken(): Observable<any> {
    return this.http.get(`${this.baseUrl}/authentication/token/new`);
  }

  /**
   * PASO 2: Crear sesión con el token autorizado
   * Después de que el usuario autoriza en TMDb, usamos el token para crear una sesión
   */
  createSession(requestToken: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/authentication/session/new`, {
      request_token: requestToken,
    });
  }

  /**
   * PASO 3: Obtener detalles de la cuenta
   * Con el session_id obtenemos información del usuario (id, nombre, etc.)
   */
  getAccountDetails(sessionId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/account`, {
      params: { session_id: sessionId }, // session_id como parámetro de query
    });
  }

  /**
   * Cerrar sesión en el servidor de TMDb
   * Invalida el session_id en el servidor
   */
  deleteSession(sessionId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/authentication/session`, {
      body: { session_id: sessionId }, // DELETE con body
    });
  }

  /**
   * Verificar si hay una sesión activa localmente
   * @returns true si está autenticado, false si no
   */
  isAuthenticated(): boolean {
    // !! convierte cualquier valor a boolean
    return !!localStorage.getItem('session_id');
  }

  /**
   * Cerrar sesión localmente
   * Elimina los datos del localStorage
   */
  logout(): void {
    localStorage.removeItem('session_id');
    localStorage.removeItem('account_id');
  }
}
```

### 📝 TU CÓDIGO en `login-page.ts` - Flujo completo

```typescript
export class LoginPage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    // Detectar si viene del callback de TMDb
    const requestToken = this.route.snapshot.queryParams['request_token'];
    const approved = this.route.snapshot.queryParams['approved'];

    if (requestToken && approved === 'true') {
      this.handleCallback(requestToken); // Procesar el callback
    }
  }

  /**
   * PASO 1: Iniciar el proceso de login
   */
  login(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Obtener el request token
    this.authService.getRequestToken().subscribe({
      next: (response) => {
        const token = response.request_token;
        // Redirigir a TMDb para que el usuario autorice
        window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:4200/login`;
      },
      error: (error) => {
        console.error('Error obteniendo token:', error);
        this.errorMessage = 'Error al iniciar sesión.';
        this.isLoading = false;
      },
    });
  }

  /**
   * PASO 2 y 3: Procesar callback y crear sesión
   */
  private handleCallback(requestToken: string): void {
    this.isLoading = true;

    // Crear la sesión con el token autorizado
    this.authService.createSession(requestToken).subscribe({
      next: (sessionResponse) => {
        const sessionId = sessionResponse.session_id;
        
        // GUARDAR session_id EN LOCALSTORAGE
        localStorage.setItem('session_id', sessionId);

        // Obtener el account_id del usuario
        this.authService.getAccountDetails(sessionId).subscribe({
          next: (accountDetails) => {
            // GUARDAR account_id EN LOCALSTORAGE
            localStorage.setItem('account_id', accountDetails.id.toString());
            this.isLoading = false;
            
            // Redirigir a la página de listas
            this.router.navigate(['/my-lists']);
          },
          error: (error) => {
            console.error('Error obteniendo cuenta:', error);
            this.errorMessage = 'Error al obtener información de cuenta.';
            this.isLoading = false;
          },
        });
      },
      error: (error) => {
        console.error('Error creando sesión:', error);
        this.errorMessage = 'Error al crear sesión.';
        this.isLoading = false;
      },
    });
  }
}
```

### 📝 TU CÓDIGO en `movies-service.ts` - Modificar listas

```typescript
/**
 * PETICIÓN POST PARA MODIFICAR LISTAS (requiere session_id)
 * Añade una película a una lista del usuario
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
```

### 📝 TU CÓDIGO en `account-service.ts` - Obtener listas

```typescript
getAccountLists(accountId: string): Observable<AccountListsResponse> {
  const sessionId = localStorage.getItem('session_id');

  return this.http.get<AccountListsResponse>(
    `${this.baseUrl}/account/${accountId}/lists`,
    {
      params: {
        session_id: sessionId || '',
      },
    }
  );
}
```

### 📝 En el componente

```typescript
export class ListasComponent {
  private moviesService = inject(MoviesService);
  
  listas: any[] = [];
  
  cargarListas(): void {
    const accountId = localStorage.getItem('account_id');
    
    if (!accountId) {
      console.error('No hay sesión activa');
      return;
    }
    
    this.moviesService.getAccountLists(accountId).subscribe({
      next: (response) => {
        this.listas = response.results;
      },
      error: (err) => console.error('Error:', err)
    });
  }
  
  añadirPelicula(listId: string, movieId: number): void {
    this.moviesService.addMovieToList(listId, movieId).subscribe({
      next: (response) => {
        console.log('Película añadida correctamente');
        this.cargarListas(); // Recargar para ver cambios
      },
      error: (err) => console.error('Error al añadir:', err)
    });
  }
  
  eliminarPelicula(listId: string, movieId: number): void {
    this.moviesService.removeMovieFromList(listId, movieId).subscribe({
      next: (response) => {
        console.log('Película eliminada correctamente');
        this.cargarListas(); // Recargar para ver cambios
      },
      error: (err) => console.error('Error al eliminar:', err)
    });
  }
}
```

### ⚠️ Errores comunes
- ❌ Olvidar pasar `session_id` en las peticiones POST
- ❌ No verificar que existe `session_id` antes de hacer la petición
- ❌ No guardar `account_id` y `session_id` en localStorage
- ❌ Usar GET en lugar de POST para modificar listas

---

## 7. CHECKLIST FINAL ✅

### Verifica que entiendes TU PROYECTO:

#### ✅ Peticiones GET (movies-service.ts)
- [ ] `getPopularMovies()` - GET simple
- [ ] `getTopRatedMovies()` - GET simple
- [ ] `getMoviesByGenre()` - GET con params
- [ ] Entiendes el tipado genérico `http.get<MovieResponse>`
- [ ] Sabes suscribirte con `.subscribe({next, error})`

#### ✅ Interceptors
- [ ] `api-key-interceptor.ts` - Añade Bearer token automáticamente
- [ ] `logging-interceptor.ts` - Muestra URLs en consola
- [ ] Entiendes `req.clone()` (peticiones inmutables)
- [ ] Sabes que `next(req)` continúa la petición
- [ ] Están registrados en `app.config.ts` con `withInterceptors([...])`

#### ✅ Autenticación (auth-service.ts)
- [ ] `getRequestToken()` - Obtener token inicial
- [ ] `createSession()` - Crear sesión con token autorizado
- [ ] `getAccountDetails()` - Obtener account_id
- [ ] `deleteSession()` - Cerrar sesión en servidor
- [ ] `isAuthenticated()` - Verificar si hay sesión local
- [ ] `logout()` - Limpiar localStorage

#### ✅ Modificación de listas (movies-service.ts)
- [ ] `addMovieToList()` - POST con session_id en params
- [ ] `removeMovieFromList()` - POST con session_id en params
- [ ] Entiendes que necesitan `session_id` del localStorage
- [ ] Usas POST (no GET) para modificar

#### ✅ Componentes y navegación
- [ ] `login-page.ts` - Flujo completo de login/callback
- [ ] `navbar.ts` - Navegación con RouterLink
- [ ] `user-lists-page.ts` - Mostrar listas del usuario
- [ ] Usas sintaxis moderna: `@if`, `@else`, `@for`
- [ ] Usas `inject()` para inyectar servicios

#### ✅ Bootstrap
- [ ] Navbar responsive con clases Bootstrap
- [ ] Cards para mostrar listas
- [ ] Buttons, alerts, spinners
- [ ] Grid system (container, row, col-md-4)

#### ✅ localStorage
- [ ] Guardas `session_id` después del login
- [ ] Guardas `account_id` después del login
- [ ] Los recuperas con `localStorage.getItem()`
- [ ] Los eliminas en logout con `localStorage.removeItem()`

---

## 🎓 CONSEJOS PARA EL EXAMEN

1. **Lee bien el enunciado**: ¿Piden GET o POST? ¿Con o sin parámetros?

2. **Estructura mental**:
   - GET = Obtener datos
   - POST = Modificar/crear datos
   - Interceptor = Modificar todas las peticiones

3. **No olvides**:
   - Importar `HttpClient` y `CommonModule`
   - Suscribirte a los Observables
   - Manejar errores con `error: (err) => ...`
   - Usar tipado genérico `<Tipo>`

4. **Si piden autenticación**:
   - Necesitas `session_id`
   - Lo pasas en `params`
   - Lo guardas en localStorage

5. **Prueba todo**:
   - Abre la consola del navegador (F12)
   - Verifica que las peticiones salen (Network tab)
   - Mira los errores en Console

---

## 📚 RESUMEN ULTRA RÁPIDO

```typescript
// GET simple
this.http.get<Tipo>(`${url}/ruta`)

// GET con params
this.http.get<Tipo>(`${url}/ruta`, { params: { clave: valor } })

// POST con body
this.http.post(`${url}/ruta`, body, { params: { session_id: id } })

// Interceptor
export const miInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({ headers: req.headers.set('Key', 'Value') });
  return next(modifiedReq);
};

// Componente
this.servicio.metodo().subscribe({
  next: (data) => { this.datos = data; },
  error: (err) => { console.error(err); }
});
```

---

## 6. NAVEGACIÓN Y COMPONENTES

### 📝 TU CÓDIGO en `navbar.ts` - Barra de navegación

```typescript
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,       // Directiva para navegación: [routerLink]="['/ruta']"
    RouterLinkActive  // Directiva para resaltar enlace activo
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // inject(): Forma moderna de inyectar servicios
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Verificar si el usuario está autenticado
   * Se llama desde el HTML con @if (isAuthenticated())
   */
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   * Cerrar sesión del usuario
   */
  logout(): void {
    const sessionId = localStorage.getItem('session_id');
    
    if (sessionId) {
      this.authService.deleteSession(sessionId).subscribe({
        next: () => {
          this.authService.logout();
          this.router.navigate(['/']); // Navegar a inicio
        },
        error: (err) => {
          console.error('Error cerrando sesión:', err);
          this.authService.logout();
          this.router.navigate(['/']);
        },
      });
    }
  }
}
```

### 📝 TU CÓDIGO en `navbar.html` - Usando @if

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">🎬 MovieDB</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/popular" routerLinkActive="active">Explorar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/my-lists" routerLinkActive="active">Mis Listas</a>
        </li>
      </ul>
      <div class="d-flex">
        @if (isAuthenticated()) {
          <!-- Usuario autenticado -->
          <span class="navbar-text me-3">✓ Conectado</span>
          <button class="btn btn-outline-light btn-sm" (click)="logout()">Cerrar Sesión</button>
        } @else {
          <!-- Usuario NO autenticado -->
          <a class="btn btn-primary btn-sm" routerLink="/login">Iniciar Sesión</a>
        }
      </div>
    </div>
  </div>
</nav>
```

### 📝 TU CÓDIGO en `user-lists-page.html` - Usando @if y @for

```html
<div class="container mt-4">
  <h1 class="mb-4">📋 Mis Listas de Películas</h1>

  <!-- Mostrar mientras carga -->
  @if (isLoading) {
    <div class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  }

  <!-- Mostrar si hay error -->
  @else if (errorMessage) {
    <div class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
  }

  <!-- Mostrar si no hay listas -->
  @else if (lists.length === 0) {
    <div class="alert alert-info" role="alert">
      No tienes listas creadas aún.
    </div>
  }

  <!-- Mostrar las listas con @for -->
  @else {
    <div class="row">
      @for (list of lists; track list.id) {
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{ list.name }}</h5>
              <p class="card-text">{{ list.description }}</p>
              <div class="d-flex justify-content-between">
                <span class="badge bg-primary">{{ list.item_count }} películas</span>
                <span class="badge bg-warning text-dark">⭐ {{ list.favorite_count }} favoritos</span>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  }
</div>
```

---

### 🟡 IMPORTANTE (si lo piden): Crear servicio de autenticación

**Archivo a crear**: `src/app/services/auth-service.ts`

```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Paso 1: Obtener request token
  getRequestToken(): Observable<any> {
    return this.http.get(`${this.baseUrl}/authentication/token/new`);
  }

  // Paso 2: Crear sesión con el token autorizado
  createSession(requestToken: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/authentication/session/new`, {
      request_token: requestToken,
    });
  }

  // Paso 3: Obtener detalles de la cuenta
  getAccountDetails(sessionId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/account`, {
      params: { session_id: sessionId },
    });
  }

  // Cerrar sesión
  deleteSession(sessionId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/authentication/session`, {
      body: { session_id: sessionId },
    });
  }

  // Verificar si hay sesión activa
  isAuthenticated(): boolean {
    return !!localStorage.getItem('session_id');
  }

  // Cerrar sesión local
  logout(): void {
    localStorage.removeItem('session_id');
    localStorage.removeItem('account_id');
  }
}
```

---

### 🟡 IMPORTANTE (si lo piden): Crear componente de login

**Comando**:
```bash
ng generate component pages/login-page
```

**Código** (`login-page.ts`):

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    const requestToken = this.route.snapshot.queryParams['request_token'];
    const approved = this.route.snapshot.queryParams['approved'];

    if (requestToken && approved === 'true') {
      this.handleCallback(requestToken);
    }
  }

  login(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.getRequestToken().subscribe({
      next: (response) => {
        const token = response.request_token;
        window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:4200/login`;
      },
      error: (error) => {
        console.error('Error obteniendo token:', error);
        this.errorMessage = 'Error al iniciar sesión.';
        this.isLoading = false;
      },
    });
  }

  private handleCallback(requestToken: string): void {
    this.isLoading = true;

    this.authService.createSession(requestToken).subscribe({
      next: (sessionResponse) => {
        const sessionId = sessionResponse.session_id;
        localStorage.setItem('session_id', sessionId);

        this.authService.getAccountDetails(sessionId).subscribe({
          next: (accountDetails) => {
            localStorage.setItem('account_id', accountDetails.id.toString());
            this.isLoading = false;
            this.router.navigate(['/user-lists']);
          },
          error: (error) => {
            console.error('Error obteniendo cuenta:', error);
            this.errorMessage = 'Error al obtener información de cuenta.';
            this.isLoading = false;
          },
        });
      },
      error: (error) => {
        console.error('Error creando sesión:', error);
        this.errorMessage = 'Error al crear sesión.';
        this.isLoading = false;
      },
    });
  }

  logout(): void {
    const sessionId = localStorage.getItem('session_id');
    
    if (sessionId) {
      this.authService.deleteSession(sessionId).subscribe({
        next: () => {
          this.authService.logout();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error cerrando sesión:', err);
          this.authService.logout();
          this.router.navigate(['/']);
        },
      });
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
```

**HTML** (`login-page.html`):

```html
<div class="login-container">
  <h1>Iniciar Sesión</h1>

  <div *ngIf="!isAuthenticated()">
    <p>Para gestionar tus listas necesitas iniciar sesión con tu cuenta de TMDb.</p>
    
    <button (click)="login()" [disabled]="isLoading">
      {{ isLoading ? 'Cargando...' : 'Iniciar Sesión con TMDb' }}
    </button>

    <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
  </div>

  <div *ngIf="isAuthenticated()">
    <p>Ya has iniciado sesión.</p>
    <button (click)="logout()">Cerrar Sesión</button>
  </div>
</div>
```

**Añadir ruta** en `app.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';

export const routes: Routes = [
  { path: '', redirectTo: '/discover', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  // ... otras rutas
];
```

---

### 🟢 OPCIONAL: Búsqueda por texto

En `movies-service.ts`:

```typescript
searchMovies(query: string): Observable<MovieResponse> {
  return this.http.get<MovieResponse>(`${this.baseUrl}/search/movie`, {
    params: { query }
  });
}
```

En el componente:

```typescript
searchTerm: string = '';

onSearch(): void {
  if (this.searchTerm.trim()) {
    this.moviesService.searchMovies(this.searchTerm).subscribe({
      next: (response) => {
        this.results = response.results;
      },
      error: (err) => console.error('Error en búsqueda:', err)
    });
  }
}
```

HTML:

```html
<input 
  type="text" 
  [(ngModel)]="searchTerm" 
  placeholder="Buscar películas..."
  (keyup.enter)="onSearch()"
>
<button (click)="onSearch()">Buscar</button>
```

---

## 📚 RESUMEN ULTRA RÁPIDO DE TU PROYECTO

```typescript
// GET simple
this.http.get<MovieResponse>(`${this.baseUrl}/movie/popular`)

// GET con params
this.http.get<MovieResponse>(`${this.baseUrl}/discover/movie`, {
  params: { with_genres: genreId }
})

// POST con session_id
this.http.post(`${this.baseUrl}/list/${listId}/add_item`, body, {
  params: { session_id: sessionId }
})

// Interceptor
export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const reqWithHeader = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${API_TOKEN}`)
  });
  return next(reqWithHeader);
};

// Componente con @if
@if (isAuthenticated()) {
  <button (click)="logout()">Cerrar Sesión</button>
} @else {
  <a routerLink="/login">Iniciar Sesión</a>
}

// Componente con @for
@for (list of lists; track list.id) {
  <div>{{ list.name }}</div>
}

// localStorage
localStorage.setItem('session_id', sessionId);
const id = localStorage.getItem('session_id');
localStorage.removeItem('session_id');
```

---

## 🚀 ¡TU PROYECTO ESTÁ COMPLETO!

### ✅ Lo que tienes funcionando al 100%:

1. **Servicios**: movies, auth, account, genre
2. **Interceptors**: api-key (Bearer token), logging
3. **Páginas**: login, user-lists, movie-discover
4. **Componentes**: navbar con RouterLink
5. **Sintaxis moderna**: @if, @else, @for, inject()
6. **Bootstrap**: navbar, cards, buttons, alerts, grid
7. **Autenticación**: flujo completo con localStorage
8. **Rutas**: configuradas y funcionando

### 🎯 Para el examen:

1. **Revisa** esta guía (tiene TODO tu código comentado)
2. **Practica** haciendo peticiones y viendo la consola (F12)
3. **Entiende** el flujo: interceptor → petición → subscribe → actualizar vista
4. **Recuerda** que los interceptors se ejecutan automáticamente
5. **session_id** siempre se pasa en `params` para modificar listas

**¡Mucha suerte! 🚀** Tu proyecto está completo y bien estructurado.
