import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonResultado } from './boton-resultado';

describe('BotonResultado', () => {
  let component: BotonResultado;
  let fixture: ComponentFixture<BotonResultado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonResultado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonResultado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
