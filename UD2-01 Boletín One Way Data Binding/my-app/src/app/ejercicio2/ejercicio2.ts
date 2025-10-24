import { Component } from '@angular/core';

@Component({
  selector: 'app-ejercicio2',
  standalone: true,
  imports: [],
  templateUrl: './ejercicio2.html',
  styleUrls: ['./ejercicio2.css']
})
export class Ejercicio2 {
  titulo = 'Bienvenido'

  cambiarTitulo(){
    this.titulo = 'Titulo cambiado coñasosaso';
  }
}
