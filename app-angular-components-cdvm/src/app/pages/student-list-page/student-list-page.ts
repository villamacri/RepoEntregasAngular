import { Component } from '@angular/core';
import { Student } from '../../interfaces/student';
import { StudentListComponent } from '../../components/student-list-component/student-list-component';

@Component({
  selector: 'app-student-list-page',
  imports: [StudentListComponent],
  templateUrl: './student-list-page.html',
  styleUrl: './student-list-page.css',
})
export class StudentListPage {
  students: Student[] = [
    {
      numAlumno: 1,
      nombre: 'Carlos',
      apellidos: 'García López',
      nif: '12345678A',
      edad: 20,
      cursoMatr: '2º DAM'
    },
    {
      numAlumno: 2,
      nombre: 'María',
      apellidos: 'Rodríguez Sánchez',
      nif: '23456789B',
      edad: 21,
      cursoMatr: '2º DAM'
    },
    {
      numAlumno: 3,
      nombre: 'Juan',
      apellidos: 'Martínez Fernández',
      nif: '34567890C',
      edad: 19,
      cursoMatr: '2º DAM'
    },
    {
      numAlumno: 4,
      nombre: 'Ana',
      apellidos: 'López Díaz',
      nif: '45678901D',
      edad: 22,
      cursoMatr: '2º DAM'
    },
    {
      numAlumno: 5,
      nombre: 'Pedro',
      apellidos: 'González Ruiz',
      nif: '56789012E',
      edad: 20,
      cursoMatr: '2º DAM'
    }
  ];
}

