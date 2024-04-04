import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Define la propiedad loginForm como un FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService // Inyecta el servicio AuthService en el constructor
  ) {
    // Inicializa el formulario en el constructor
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // El código de inicialización de la clase va aquí
  }

  onSubmit() {
    // Obtén los valores del formulario
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Llama al método de autenticación del servicio AuthService
    this.authService.login(email, password).subscribe(
      () => {
        // La autenticación fue exitosa, redirige al usuario al componente Home
        // Aquí debes colocar la lógica para redirigir al usuario al componente Home
        console.log('Inicio de sesión exitoso');
      },
      (error: any) => {
        // La autenticación falló, maneja el error adecuadamente
        console.error('Error al iniciar sesión:', error);
      }
    );
  }
}
