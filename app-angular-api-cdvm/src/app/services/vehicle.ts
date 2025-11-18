import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleDetail } from '../interfaces/vehicle-detail';
import { VehiclesResponse } from '../interfaces/vehicles-response';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private http = inject(HttpClient);
  private url = "https://swapi.dev/api/vehicles";
  private apiUrl = 'https://swapi.dev/api/vehicles';


  getVehicles(): Observable<VehiclesResponse> {
    return this.http.get<VehiclesResponse>(this.apiUrl);
  }

  getVehicle(id: number): Observable<VehicleDetail> {
    return this.http.get<VehicleDetail>(`${this.url}/${id}`);
  }
}
