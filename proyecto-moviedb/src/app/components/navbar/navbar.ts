import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';

/**
 * COMPONENTE NAVBAR
 * Barra de navegación con enlaces y estado de autenticación
 * Usa RouterLink para navegación y @if para mostrar/ocultar según login
 */
@Component({
  selector: 'app-navbar', // Se usa como <app-navbar></app-navbar>
  imports: [
    RouterLink,       // Directiva para navegación: [routerLink]="['/ruta']"
    RouterLinkActive  // Directiva para resaltar enlace activo: routerLinkActive="active"
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // inject(): Forma moderna de inyectar servicios (alternativa al constructor)
  private authService = inject(AuthService);
  private router = inject(Router); // Para navegación programática

  /**
   * Verificar si el usuario está autenticado
   * Se llama desde el HTML con @if (isAuthenticated())
   * @returns true si hay sesión activa, false si no
   */
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   * Cerrar sesión del usuario
   * 1. Elimina la sesión en el servidor de TMDb
   * 2. Elimina los datos del localStorage
   * 3. Redirige a la página principal
   */
  logout(): void {
    const sessionId = localStorage.getItem('session_id');
    
    if (sessionId) {
      // Llamar al servicio para eliminar la sesión en TMDb
      this.authService.deleteSession(sessionId).subscribe({
        next: () => {
          // Si sale bien, limpiar localStorage y redirigir
          this.authService.logout();
          this.router.navigate(['/']); // Navegar a la página principal
        },
        error: (err) => {
          console.error('Error cerrando sesión:', err);
          // Aunque falle en el servidor, limpiamos localmente
          this.authService.logout();
          this.router.navigate(['/']);
        },
      });
    }
  }
}
