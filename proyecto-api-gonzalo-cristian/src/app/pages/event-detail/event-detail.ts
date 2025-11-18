import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../services/event-service';
import { Event } from '../../interfaces/event-list-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit {
  event: Event | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(id).subscribe({
        next: (resp) => {
          console.log('Event Detail Response:', resp);
          this.event = resp as any;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar el evento:', error);
          this.isLoading = false;
        }
      });
    }
  }

  getEventImage(): string {
    if (this.event?.images && this.event.images.length > 0) {
      return this.event.images[0].url;
    }
    return 'https://via.placeholder.com/800x400?text=No+Image';
  }

  getEventDate(): string {
    const startDate = this.event?.dates?.start;
    if (startDate?.localDate) {
      return new Date(startDate.localDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Fecha por confirmar';
  }

  getEventTime(): string {
    const startDate = this.event?.dates?.start;
    if (startDate?.localTime) {
      return startDate.localTime;
    }
    return 'Hora por confirmar';
  }

  getEventVenue(): string {
    const venues = this.event?._embedded?.venues;
    if (venues && venues.length > 0) {
      const venue = venues[0];
      return venue.name;
    }
    return 'Lugar por confirmar';
  }

  getEventAddress(): string {
    const venues = this.event?._embedded?.venues;
    if (venues && venues.length > 0) {
      const venue = venues[0];
      const parts = [];
      if (venue.city?.name) parts.push(venue.city.name);
      if (venue.state?.name) parts.push(venue.state.name);
      if (venue.country?.name) parts.push(venue.country.name);
      return parts.join(', ');
    }
    return '';
  }

  getEventPrice(): string {
    const priceRanges = this.event?.priceRanges;
    if (priceRanges && priceRanges.length > 0) {
      const price = priceRanges[0];
      return `${price.min} - ${price.max} ${price.currency || 'USD'}`;
    }
    return 'Precio por confirmar';
  }
}
