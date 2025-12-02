import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, RouterLink],
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
    // Si viene con request_token desde TMDb, procesar el callback
    const requestToken = this.route.snapshot.queryParams['request_token'];
    const approved = this.route.snapshot.queryParams['approved'];

    if (requestToken && approved === 'true') {
      this.handleCallback(requestToken);
    }
  }

  // Iniciar el proceso de login
  login(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Paso 1: Obtener el request token
    this.authService.getRequestToken().subscribe({
      next: (response) => {
        const token = response.request_token;
        // Redirigir a TMDb para que el usuario autorice la aplicación
        window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:4200/login`;
      },
      error: (error) => {
        console.error('Error obteniendo token:', error);
        this.errorMessage = 'Error al iniciar sesión. Intenta de nuevo.';
        this.isLoading = false;
      },
    });
  }

  // Procesar el callback después de que el usuario autoriza
  private handleCallback(requestToken: string): void {
    this.isLoading = true;

    // Paso 2: Crear la sesión con el token autorizado
    this.authService.createSession(requestToken).subscribe({
      next: (sessionResponse) => {
        const sessionId = sessionResponse.session_id;
        // Guardar el session_id en localStorage
        localStorage.setItem('session_id', sessionId);

        // Paso 3: Obtener el account_id del usuario
        this.authService.getAccountDetails(sessionId).subscribe({
          next: (accountDetails) => {
            // Guardar el account_id en localStorage
            localStorage.setItem('account_id', accountDetails.id.toString());
            this.isLoading = false;
            // Redirigir a la página de listas del usuario
            this.router.navigate(['/user-lists']);
          },
          error: (error) => {
            console.error('Error obteniendo detalles de cuenta:', error);
            this.errorMessage = 'Error al obtener información de cuenta.';
            this.isLoading = false;
          },
        });
      },
      error: (error) => {
        console.error('Error creando sesión:', error);
        this.errorMessage = 'Error al crear sesión. Intenta de nuevo.';
        this.isLoading = false;
      },
    });
  }

  // Cerrar sesión del usuario
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
          // Aunque falle, eliminamos la sesión local
          this.authService.logout();
          this.router.navigate(['/']);
        },
      });
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
