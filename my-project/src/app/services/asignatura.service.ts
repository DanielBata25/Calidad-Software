import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { API_BASE_URL, isApiConfigured } from './api-config';
import { AsignaturaCreateDto, AsignaturaResponseDto } from '../models/asignatura.model';

@Injectable({ providedIn: 'root' })
export class AsignaturaService {
  private readonly http = inject(HttpClient);
  private readonly resourceUrl = `${API_BASE_URL}/Asignatura`;

  getAll(): Observable<AsignaturaResponseDto[]> {
    if (!isApiConfigured()) {
      console.warn('GET /Asignatura ➜ Configura API_BASE_URL para habilitar la petición.');
      return of([]);
    }
    return this.http.get<AsignaturaResponseDto[]>(this.resourceUrl);
  }

  create(payload: AsignaturaCreateDto): Observable<AsignaturaResponseDto | null> {
    if (!isApiConfigured()) {
      console.warn('POST /Asignatura ➜ Configura API_BASE_URL para habilitar la petición.', payload);
      return of(null);
    }
    return this.http.post<AsignaturaResponseDto>(this.resourceUrl, payload);
  }

  update(id: number, payload: AsignaturaCreateDto): Observable<void> {
    if (!isApiConfigured()) {
      console.warn(`PUT /Asignatura/${id} ➜ Configura API_BASE_URL para habilitar la petición.`, payload);
      return of(void 0);
    }
    return this.http.put<void>(`${this.resourceUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    if (!isApiConfigured()) {
      console.warn(`DELETE /Asignatura/${id} ➜ Configura API_BASE_URL para habilitar la petición.`);
      return of(void 0);
    }
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }
}
