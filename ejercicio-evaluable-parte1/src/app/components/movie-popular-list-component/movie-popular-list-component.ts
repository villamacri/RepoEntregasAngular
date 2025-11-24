import { Component, Input, OnInit } from '@angular/core';
import { HomePageService } from '../../services/home-page-service';

@Component({
  selector: 'app-movie-popular-list-component',
  imports: [],
  templateUrl: './movie-popular-list-component.html',
  styleUrl: './movie-popular-list-component.css',
})
export class MoviePopularListComponent implements OnInit {

    @Input()numItems: number | string = 4;

  movieList: any[] = [];
  movieListFiltrado: any[] = [];

  constructor(private movieService: HomePageService) { }
  
    filterList() {
    if (this.numItems === 'All') {
      this.movieListFiltrado = this.movieList;
    } else {
      this.movieListFiltrado = this.movieList.slice(0, Number(this.numItems));
    }
  }
  
  ngOnInit(): void {
    this.movieService.getMoviePopular().subscribe(response =>{
      this.movieList = response.results;
      this.filterList();
    })
  }

  ngOnChanges(){
    this.filterList();
  }
}
