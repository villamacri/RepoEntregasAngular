import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePopularList } from './people-popular-list';

describe('PeoplePopularList', () => {
  let component: PeoplePopularList;
  let fixture: ComponentFixture<PeoplePopularList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeoplePopularList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeoplePopularList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
