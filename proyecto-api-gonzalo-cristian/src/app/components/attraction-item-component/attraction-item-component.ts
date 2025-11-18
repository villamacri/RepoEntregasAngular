import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Attraction } from '../../interface/attractionsResponse';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api-service';

@Component({
  selector: 'app-attraction-item-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './attraction-item-component.html',
  styleUrl: './attraction-item-component.css',
})
export class AttractionItemComponent {

attraction: Attraction | undefined;
isLoading: boolean = true;

constructor(
  private route: ActivatedRoute,
  private apiService: ApiService
){}
ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.apiService.getAttractionById(id).subscribe({
      next: (resp: Attraction) => {
        this.attraction = resp;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching attraction:', error);
        this.isLoading = false;
      }
    });
  } else {
    this.isLoading = false;
    console.error('No attraction ID provided in route.');
  }
}

}
