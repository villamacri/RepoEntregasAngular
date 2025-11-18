import { Component } from '@angular/core';
import { ApiService } from '../../service/api-service';
import { Attraction } from '../../interface/attractionsResponse';
import { AttractionItemComponent } from '../attraction-item-component/attraction-item-component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
;

@Component({
  selector: 'app-attraction-list-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './attraction-list-component.html',
  styleUrl: './attraction-list-component.css',
})
export class AttractionListComponent {
[x: string]: any;
  attractions: Attraction[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAttractions().subscribe((resp) => {
      if (resp._embedded && resp._embedded.attractions) {
        this.attractions = resp._embedded.attractions;
      }
    });
  }
}
