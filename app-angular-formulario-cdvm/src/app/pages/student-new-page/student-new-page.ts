import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'register',
  imports: [ReactiveFormsModule],
  templateUrl: './student-new-page.html',
  styleUrl: './student-new-page.css',
})
export class StudentNewPage {
  formGroup = new FormGroup ({
    nombre : new FormControl('', [Validators.required]),
    apellidos : new FormControl('', [Validators.required]),
    dni : new FormControl('', [Validators.required]),
    curso : new FormControl('', [Validators.required])
  });


    onSubmit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
