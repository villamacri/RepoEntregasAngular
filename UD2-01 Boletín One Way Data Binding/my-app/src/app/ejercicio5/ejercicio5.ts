import { Component } from '@angular/core';

@Component({
  selector: 'app-ejercicio5',
  standalone: true,
  imports: [],
  templateUrl: './ejercicio5.html',
  styleUrls: ['./ejercicio5.css']
})
export class Ejercicio5 {
  progreso = 0;

  aumentar() {
    if(this.progreso < 100) this.progreso +=10;
  }

  disminuir(){
    if(this.progreso > 0) this.progreso -= 10;
  }
}
