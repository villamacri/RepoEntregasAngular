import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieDiscoverComponent } from '../../components/movie-discover-component/movie-discover-component';


@Component({
  selector: 'app-movie-discover-page',
  imports: [MovieDiscoverComponent],
  templateUrl: './movie-discover-page.html',
  styleUrl: './movie-discover-page.css',
})
export class MovieDiscoverPage {
  
}
