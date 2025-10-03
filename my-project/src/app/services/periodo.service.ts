import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { API_BASE_URL, isApiConfigured } from './api-config';
import { PeriodoCreateDto, PeriodoResponseDto } from '../models/periodo.model';

@Injectable({ providedIn: 'root' })
export class PeriodoService {
  private readonly http = inject(HttpClient);
  private readonly resourceUrl = `${API_BASE_URL}/Periodo`;

  getAll(): Observable<PeriodoResponseDto[]> {
    if (!isApiConfigured()) {
      console.warn('GET /Periodo ➜ Configura API_BASE_URL para habilitar la petición.');
      return of([]);
    }
    return this.http.get<PeriodoResponseDto[]>(this.resourceUrl);
  }

  create(payload: PeriodoCreateDto): Observable<PeriodoResponseDto | null> {
    if (!isApiConfigured()) {
      console.warn('POST /Periodo ➜ Configura API_BASE_URL para habilitar la petición.', payload);
      return of(null);
    }
    return this.http.post<PeriodoResponseDto>(this.resourceUrl, payload);
  }
}
