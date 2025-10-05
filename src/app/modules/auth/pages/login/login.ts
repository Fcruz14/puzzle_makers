import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  // Define el FormGroup para el formulario de login
  loginForm: FormGroup;
  // Estado para controlar el spinner de carga en el botón
  loading: boolean = false;
  // Mensaje de error (opcional)
  loginError: string | null = null;

  constructor(private fb: FormBuilder,private router:Router) {
    // Inyección de FormBuilder
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  // Getter para un acceso fácil a los controles del formulario en el template
  get f() {
    return this.loginForm.controls;
  }

  // Método que se llama al enviar el formulario
  onSubmit() {
    this.loginError = null; // Limpiar errores previos

    // Verificar si el formulario es válido
    if (this.loginForm.invalid) {
      // Marcar todos los campos como "touched" para mostrar errores
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true; // Activar el ícono de carga

    // **SIMULACIÓN** de llamada al Backend (reemplazar con tu servicio real)
    console.log('Datos a enviar:', this.loginForm.value);

    // Simular una solicitud HTTP que tarda 2 segundos
    setTimeout(() => {
      this.loading = false; // Desactivar el ícono de carga

      // Lógica de autenticación simulada
      if (this.loginForm.value.usuario === 'nasauser') {
        // Éxito:
        console.log('¡Inicio de sesión exitoso!');
        // Aquí iría la lógica de navegación (ej: this.router.navigate(['/dashboard']));
      } else {
        // Error:
        this.loginError = 'Acceso Denegado: Credenciales de usuario no autorizadas.';
      }
    }, 2000);
  }

  // Método para manejar la navegación a registro (reemplazar con tu lógica de routing)
  goToRegister() {
    this.router.navigate(['/auth/register'])
  }
}