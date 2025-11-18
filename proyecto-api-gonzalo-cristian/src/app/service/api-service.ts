import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attraction, TicketmasterAttractionResponse } from '../interface/attractionsResponse';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiKey = "0F1NrUehGAM5LooApTTgyaw3ZPiXmkuT"
  baseUrl = "https://app.ticketmaster.com/discovery/v2";

  constructor(private http: HttpClient){}

  getAttractions(): Observable<TicketmasterAttractionResponse>{
    const url = `${this.baseUrl}/attractions?apikey=${this.apiKey}`;
    return this.http.get<TicketmasterAttractionResponse>(url);  
  }
  getAttractionById(id: string): Observable<Attraction>{
    const url = `${this.baseUrl}/attractions/${id}?apikey=${this.apiKey}`;
    return this.http.get<Attraction>(url);  
  }

}
