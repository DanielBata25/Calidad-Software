import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { API_BASE_URL, isApiConfigured } from './api-config';
import { ColegioCreateDto, ColegioResponseDto } from '../models/colegio.model';

@Injectable({ providedIn: 'root' })
export class ColegioService {
  private readonly http = inject(HttpClient);
  private readonly resourceUrl = `${API_BASE_URL}/Colegio`;

  getAll(): Observable<ColegioResponseDto[]> {
    if (!isApiConfigured()) {
      console.warn('GET /Colegio ➜ Configura API_BASE_URL para habilitar la petición.');
      return of([]);
    }
    return this.http.get<ColegioResponseDto[]>(this.resourceUrl);
  }

  getById(id: number): Observable<ColegioResponseDto | null> {
    if (!isApiConfigured()) {
      console.warn(`GET /Colegio/${id} ➜ Configura API_BASE_URL para habilitar la petición.`);
      return of(null);
    }
    return this.http.get<ColegioResponseDto>(`${this.resourceUrl}/${id}`);
  }

  create(payload: ColegioCreateDto): Observable<ColegioResponseDto | null> {
    if (!isApiConfigured()) {
      console.warn('POST /Colegio ➜ Configura API_BASE_URL para habilitar la petición.', payload);
      return of(null);
    }
    return this.http.post<ColegioResponseDto>(this.resourceUrl, payload);
  }

  update(id: number, payload: ColegioCreateDto): Observable<void> {
    if (!isApiConfigured()) {
      console.warn(`PUT /Colegio/${id} ➜ Configura API_BASE_URL para habilitar la petición.`, payload);
      return of(void 0);
    }
    return this.http.put<void>(`${this.resourceUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    if (!isApiConfigured()) {
      console.warn(`DELETE /Colegio/${id} ➜ Configura API_BASE_URL para habilitar la petición.`);
      return of(void 0);
    }
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }
}
