import { Component, input } from '@angular/core';
import { Event } from '../../interfaces/event-list-response';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-item-component',
  imports: [RouterLink],
  templateUrl: './event-item-component.html',
  styleUrl: './event-item-component.css'
})
export class EventItemComponent {
  event = input.required<Event>();

  getEventImage(): string {
    const images = this.event().images;
    if (images && images.length > 0) {
      return images[0].url;
    }
    return 'https://via.placeholder.com/400x300?text=No+Image';
  }

  getEventDate(): string {
    const startDate = this.event().dates?.start;
    if (startDate?.localDate) {
      return new Date(startDate.localDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Fecha por confirmar';
  }

  getEventVenue(): string {
    const venues = this.event()._embedded?.venues;
    if (venues && venues.length > 0) {
      const venue = venues[0];
      return `${venue.name}${venue.city ? ', ' + venue.city.name : ''}`;
    }
    return 'Lugar por confirmar';
  }

  getEventPrice(): string {
    const priceRanges = this.event().priceRanges;
    if (priceRanges && priceRanges.length > 0) {
      const price = priceRanges[0];
      return `${price.min} - ${price.max} ${price.currency || 'USD'}`;
    }
    return 'Precio por confirmar';
  }
}
