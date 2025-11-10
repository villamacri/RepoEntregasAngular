import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-form-page.html',
  styleUrl: './register-form-page.css',
})
export class RegisterFormPage {
  formGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(3)]),
    nif: new FormControl('', [Validators.required, Validators.pattern(/^[XYZ0-9][0-9]{7}[A-Za-z]$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]),
    sexo: new FormControl('', [Validators.required]),
    conocidoPor: new FormControl('', [Validators.required]),
    contraseña: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmarContraseña: new FormControl('', [Validators.required]),
    aceptarTerminos: new FormControl(false, [Validators.requiredTrue]),
  });

  onSubmit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
