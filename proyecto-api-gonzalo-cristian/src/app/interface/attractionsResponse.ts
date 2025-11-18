export interface ExternalLink {
    url: string;
    id?: string;
}

export interface ExternalLinks {
    youtube?: ExternalLink[];
    twitter?: ExternalLink[];
    itunes?: ExternalLink[];
    lastfm?: ExternalLink[];
    spotify?: ExternalLink[];
    facebook?: ExternalLink[];
    wiki?: ExternalLink[];
    instagram?: ExternalLink[];
    musicbrainz?: ExternalLink[];
    homepage?: ExternalLink[];
}

export interface Image {
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
}

export interface ClassificationCategory {
    id: string;
    name: string;
}

export interface Classification {
    primary: boolean;
    segment: ClassificationCategory;
    genre: ClassificationCategory;
    subGenre: ClassificationCategory;
    type: ClassificationCategory;
    subType: ClassificationCategory;
    family: boolean;
}

export interface UpcomingEvents {
    ticketmaster: number;
    _total: number;
    _filtered: number;
}

export interface Links {
    self: {
        href: string;
    };
}

export interface Attraction {
    results: Attraction[];
    name: string;
    type: string;
    id: string;
    test: boolean;
    url: string;
    locale: string;
    externalLinks: ExternalLinks;
    aliases: string[];
    images: Image[];
    classifications: Classification[];
    upcomingEvents: UpcomingEvents;
    _links: Links;
}
export interface TicketmasterAttractionResponse {
    _embedded: {
        attractions: Attraction[]; // Aquí está la lista
    };
    _links: {
        self: { href: string };
    };
    page: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    };
}