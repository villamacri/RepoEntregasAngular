import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenreService } from '../../services/genre-service';
import { MoviesService } from '../../services/movies-service';

@Component({
  selector: 'app-movie-discover-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-discover-component.html',
  styleUrl: './movie-discover-component.css',
})
export class MovieDiscoverComponent implements OnInit{

  private genreService = inject(GenreService);
  private moviesService = inject(MoviesService);

  genres: any []=[];
  results: any[]=[];

  tipoSeleccion: 'movie' | 'tv' = 'movie';
  seleccionIdGeneros: string = '';

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(){
    this.genreService.getGenres(this.tipoSeleccion).subscribe({
      next: (resp: any)=>{
        this.genres = resp.genres;
        this.seleccionIdGeneros = '';
        this.results = [];
      },
      error: (err) => console.error('Error cargando géneros:', err)
    });
  }

  onTypeChange(newType: string){
    this.tipoSeleccion = newType as 'movie' | 'tv';
    this.loadGenres();
  }

  onGenreChange(genreId: string){
    this.seleccionIdGeneros = genreId;
    this.search();
  }

  search(){
    this.moviesService.getMoviesByGenre(this.tipoSeleccion, this.seleccionIdGeneros).subscribe({
      next: (resp: any) => {
        this.results = resp.results;
      },
      error: (err) => console.error('Error buscando:', err)
    })
  }
  
}
