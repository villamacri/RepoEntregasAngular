import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionItemComponent } from './attraction-item-component';

describe('AttractionItemComponent', () => {
  let component: AttractionItemComponent;
  let fixture: ComponentFixture<AttractionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
