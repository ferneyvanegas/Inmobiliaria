import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Msn } from '../config/msn';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  msnEmitter = new EventEmitter<Msn>(); // Será usado para emitir mensajes de los hijos al módulo padre

  constructor() { }
}
