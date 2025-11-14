import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNewPage } from './student-new-page';

describe('StudentNewPage', () => {
  let component: StudentNewPage;
  let fixture: ComponentFixture<StudentNewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentNewPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
