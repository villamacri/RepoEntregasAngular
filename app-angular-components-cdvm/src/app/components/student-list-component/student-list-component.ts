import { Component, Input } from '@angular/core';
import { Student } from '../../interfaces/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-list-component',
  imports: [CommonModule],
  templateUrl: './student-list-component.html',
  styleUrl: './student-list-component.css',
})
export class StudentListComponent {
  @Input() students: Student[] = [];

  showStudentDetail(student: Student): void {
    alert(`Se ha pulsado en el alumno ${student.nombre}`);
  }
}

