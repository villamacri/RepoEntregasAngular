import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDiscoverPage } from './movie-discover-page';

describe('MovieDiscoverPage', () => {
  let component: MovieDiscoverPage;
  let fixture: ComponentFixture<MovieDiscoverPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDiscoverPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDiscoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
