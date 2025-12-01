import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDiscoverComponent } from './movie-discover-component';

describe('MovieDiscoverComponent', () => {
  let component: MovieDiscoverComponent;
  let fixture: ComponentFixture<MovieDiscoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDiscoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
