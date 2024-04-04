import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  regions: string[] = [
    'Arica y Parinacota',
    'Tarapacá',
    'Antofagasta',
    'Atacama',
    'Coquimbo',
    'Valparaíso',
    'Metropolitana de Santiago',
    'Libertador General Bernardo O\'Higgins',
    'Maule',
    'Ñuble',
    'Biobío',
    'La Araucanía',
    'Los Ríos',
    'Los Lagos',
    'Aysén del General Carlos Ibáñez del Campo',
    'Magallanes y de la Antártica Chilena'
  ];

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      rut: ['', Validators.required],
      region: ['', Validators.required],
      medicoGeneral: [false],
      medicoSaludMental: [false],
      medicoPediatra: [false],
      psicologia: [false],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('Formulario enviado');
    console.log(this.registerForm.value);
    // Guardar en IndexedDB
    const formData = { ...this.registerForm.value };
    formData.password = this.encryptPassword(formData.password); // Encriptar la contraseña
    this.saveFormDataToIndexedDB(formData);
    // Resetear el formulario
    this.registerForm.reset();
  }

  formatRut(rut: string): string {
    rut = rut.replace(/[^\dkK]+/g, '');
    let rutNumerico = rut.slice(0, -1);
    const digitoVerificador = rut.slice(-1).toUpperCase();
    rutNumerico = rutNumerico.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    rut = rutNumerico + '-' + digitoVerificador;
    return rut;
  }

  onRutInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const rutControl = this.registerForm.get('rut');
    if (rutControl) {
      const formattedValue = this.formatRut(input.value);
      rutControl.setValue(formattedValue);
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  saveFormDataToIndexedDB(formData: any) {
    const dbRequest = indexedDB.open('registrationDB', 1);

    dbRequest.onupgradeneeded = function(event) {
      const db = (event.target as any).result;
      const objectStore = db.createObjectStore('doctors_registered', { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('rut', 'rut', { unique: true });
      objectStore.createIndex('region', 'region', { unique: false });
      objectStore.createIndex('medicoGeneral', 'medicoGeneral', { unique: false });
      objectStore.createIndex('medicoSaludMental', 'medicoSaludMental', { unique: false });
      objectStore.createIndex('medicoPediatra', 'medicoPediatra', { unique: false });
      objectStore.createIndex('psicologia', 'psicologia', { unique: false });
      objectStore.createIndex('password', 'password', { unique: false });
    };

    dbRequest.onsuccess = function(event) {
      const db = (event.target as any).result;
      const transaction = db.transaction('doctors_registered', 'readwrite');
      const objectStore = transaction.objectStore('doctors_registered');
      objectStore.add(formData);
    };

    dbRequest.onerror = function(event) {
      console.error('Error al abrir la base de datos:', event);
    };
  }

  encryptPassword(password: string): string {
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'your-secret-key').toString();
    return encryptedPassword;
  }
}
