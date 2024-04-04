import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  }

  // Método para verificar las credenciales del usuario
  login(email: string, password: string): Observable<boolean> {
    // Aquí deberías realizar la lógica para verificar las credenciales
    // contra los datos en IndexedDB

    // Por ahora, vamos a simular una verificación exitosa
    const isValidUser = true;

    if (isValidUser) {
      this.isAuthenticatedSubject.next(true);
      this.router.navigateByUrl('/home');
    }

    return this.isAuthenticatedSubject.asObservable();
  }

  // Método para comprobar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }


}
