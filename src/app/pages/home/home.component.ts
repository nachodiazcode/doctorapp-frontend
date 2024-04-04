import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    console.log('Sesión cerrada');
    // Redirige al usuario a la página de inicio de sesión (login)
    this.router.navigate(['/auth/login']);
  }

}
