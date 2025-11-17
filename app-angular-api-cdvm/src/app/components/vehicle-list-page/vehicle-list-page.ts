import { Component, OnInit, inject } from '@angular/core';
import { VehicleService } from '../../services/vehicle';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../interfaces/vehicle';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-vehicle-list-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './vehicle-list-page.html',
  styleUrl: './vehicle-list-page.css',
})
export class VehicleListPage implements OnInit {
  private vehicleService = inject(VehicleService);
  vehicles: Vehicle[] = [];

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (response) => {
        this.vehicles = response.results;
      },
      error: (error) => {
        console.error('Error al cargar vehículos:', error);
      }
    });
  }
}
