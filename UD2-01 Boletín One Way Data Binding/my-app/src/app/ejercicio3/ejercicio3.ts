import { Component } from '@angular/core';

@Component({
  selector: 'app-ejercicio3',
  standalone: true,
  imports: [],
  templateUrl: './ejercicio3.html',
  styleUrls: ['./ejercicio3.css']
})
export class Ejercicio3 {
  colorTexto = 'black'

  alternarColor(){
    this.colorTexto = this.colorTexto === 'black' ? 'red' : 'black';
  }
}
