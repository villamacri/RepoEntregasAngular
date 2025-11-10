import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesOperadores } from './botones-operadores';

describe('BotonesOperadores', () => {
  let component: BotonesOperadores;
  let fixture: ComponentFixture<BotonesOperadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonesOperadores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonesOperadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
