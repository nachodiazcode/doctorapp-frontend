import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
