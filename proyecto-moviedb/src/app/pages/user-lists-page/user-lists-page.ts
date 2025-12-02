import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { MovieList } from '../../interfaces/account-list-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-lists-page',
  imports: [CommonModule],
  templateUrl: './user-lists-page.html',
  styleUrl: './user-lists-page.css',
})
export class UserListsPage implements OnInit {
  private accountService = inject(AccountService);

  lists: MovieList[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadUserLists();
  }

  loadUserLists(): void {
    const accountId = localStorage.getItem('account_id');

    if (!accountId) {
      this.errorMessage = 'No se encontró el id de cuenta. Por favor inicia sesión.';
      this.isLoading = false;
      return;
    }

    this.accountService.getAccountLists(accountId).subscribe({
      next: (response) => {
        this.lists = response.results;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar listas:', error);
        this.errorMessage = 'Error al cargar las lists intenta de nuevo.';
        this.isLoading = false;
      },
    });
  }
}
