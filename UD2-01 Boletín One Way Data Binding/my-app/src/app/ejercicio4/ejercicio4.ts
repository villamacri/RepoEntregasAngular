import { Component } from '@angular/core';

@Component({
  selector: 'app-ejercicio4',
  standalone: true,
  imports: [],
  templateUrl: './ejercicio4.html',
  styleUrls: ['./ejercicio4.css']
})
export class Ejercicio4 {
  luzEncendida = false;

  alternarLuz(){
    this.luzEncendida = !this.luzEncendida
  }
}
