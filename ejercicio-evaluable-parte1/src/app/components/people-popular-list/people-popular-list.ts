import { Component, Input, OnInit } from '@angular/core';
import { HomePageService } from '../../services/home-page-service';

@Component({
  selector: 'app-people-popular-list',
  imports: [],
  templateUrl: './people-popular-list.html',
  styleUrl: './people-popular-list.css',
})
export class PeoplePopularList implements OnInit{

  @Input()numItems: number | string = 4;

  peopleList: any[] = [];
  peopleListFiltrado: any[] = [];

  constructor(private peopleService: HomePageService) { }
  
    filterList() {
    if (this.numItems === 'All') {
      this.peopleListFiltrado = this.peopleList;
    } else {
      this.peopleListFiltrado = this.peopleList.slice(0, Number(this.numItems));
    }
  }
  
  ngOnInit(): void {
    this.peopleService.getPeoplePopular().subscribe(response =>{
      this.peopleList = response.results;
      this.filterList();
    })
  }

  ngOnChanges(){
    this.filterList();
  }

}
