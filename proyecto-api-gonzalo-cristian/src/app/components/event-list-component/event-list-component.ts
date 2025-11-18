import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event-service';
import { Event } from '../../interfaces/event-list-response';
import { EventItemComponent } from '../event-item-component/event-item-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-list-component',
  imports: [EventItemComponent, CommonModule],
  templateUrl: './event-list-component.html',
  styleUrl: './event-list-component.css'
})

export class EventListComponent implements OnInit {
  eventList: Event[] = [];
  isLoading = true;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    console.log('EventListComponent initialized');
    this.eventService.getEvents().subscribe({
      next: (resp) => {
        console.log('API Response COMPLETA:', resp);
        console.log('_embedded existe?:', resp._embedded);
        console.log('events existe?:', resp._embedded?.events);
        
        // Intentar diferentes estructuras de respuesta
        if (resp._embedded?.events) {
          this.eventList = resp._embedded.events;
        } else if ((resp as any).events) {
          this.eventList = (resp as any).events;
        } else if (Array.isArray(resp)) {
          this.eventList = resp as any;
        } else {
          console.error('Estructura de respuesta no reconocida:', resp);
          this.eventList = [];
        }
        
        console.log('Event List final:', this.eventList);
        console.log('Número de eventos:', this.eventList.length);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar eventos:', error);
        this.isLoading = false;
      }
    });
  }
}
