import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PeoplePopularResponse } from '../../interfaces/people-popular-response';
import { MoviePopularResponse } from '../../interfaces/movie-popular-response';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
