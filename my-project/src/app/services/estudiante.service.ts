import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { API_BASE_URL, isApiConfigured } from './api-config';
import { EstudianteCreateDto, EstudianteResponseDto } from '../models/estudiante.model';

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  private readonly http = inject(HttpClient);
  private readonly resourceUrl = `${API_BASE_URL}/Estudiante`;

  getAll(): Observable<EstudianteResponseDto[]> {
    if (!isApiConfigured()) {
      console.warn('GET /Estudiante ➜ Configura API_BASE_URL para habilitar la petición.');
      return of([]);
    }
    return this.http.get<EstudianteResponseDto[]>(this.resourceUrl);
  }

  create(payload: EstudianteCreateDto): Observable<EstudianteResponseDto | null> {
    if (!isApiConfigured()) {
      console.warn('POST /Estudiante ➜ Configura API_BASE_URL para habilitar la petición.', payload);
      return of(null);
    }
    return this.http.post<EstudianteResponseDto>(this.resourceUrl, payload);
  }

  update(id: number, payload: EstudianteCreateDto): Observable<void> {
    if (!isApiConfigured()) {
      console.warn(`PUT /Estudiante/${id} ➜ Configura API_BASE_URL para habilitar la petición.`, payload);
      return of(void 0);
    }
    return this.http.put<void>(`${this.resourceUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    if (!isApiConfigured()) {
      console.warn(`DELETE /Estudiante/${id} ➜ Configura API_BASE_URL para habilitar la petición.`);
      return of(void 0);
    }
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }
}
