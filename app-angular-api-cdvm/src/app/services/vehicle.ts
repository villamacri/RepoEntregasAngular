import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Vehicle {
  private http = inject(HttpClient)

  getVehicle(id: string): Observable<Vehicle>{
  return this.http.get<Vehicle>('https://swapi.dev/api/vehicles/${id}')
}
}
