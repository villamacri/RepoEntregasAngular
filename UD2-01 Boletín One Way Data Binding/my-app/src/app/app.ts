import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Ejercicio1 } from "./ejercicio1/ejercicio1";
import { Ejercicio2 } from "./ejercicio2/ejercicio2";
import { Ejercicio3 } from "./ejercicio3/ejercicio3";
import { Ejercicio4 } from "./ejercicio4/ejercicio4";
import { Ejercicio5 } from "./ejercicio5/ejercicio5";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Ejercicio1, Ejercicio2, Ejercicio3, Ejercicio4, Ejercicio5],
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('my-app');
}
