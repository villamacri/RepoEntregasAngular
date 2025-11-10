import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaResultado } from './pantalla-resultado';

describe('PantallaResultado', () => {
  let component: PantallaResultado;
  let fixture: ComponentFixture<PantallaResultado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaResultado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaResultado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
