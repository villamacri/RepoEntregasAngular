import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventListResponse } from '../interfaces/event-list-response';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  apiKey = "0F1NrUehGAM5LooApTTgyaw3ZPiXmkuT"
  baseUrl = "/api";

  constructor(private http: HttpClient) {}

  getEvents(): Observable<EventListResponse> {
    return this.http.get<EventListResponse>(`${this.baseUrl}/events?apikey=${this.apiKey}`);
  }

  getEventById(id: string): Observable<EventListResponse> {
    return this.http.get<EventListResponse>(`${this.baseUrl}/events/${id}?apikey=${this.apiKey}`);
  }
}
