import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { API_BASE_URL, isApiConfigured } from './api-config';
import { NotaCreateDto, NotaResponseDto } from '../models/nota.model';

@Injectable({ providedIn: 'root' })
export class NotaService {
  private readonly http = inject(HttpClient);
  private readonly resourceUrl = `${API_BASE_URL}/Nota`;

  getAll(): Observable<NotaResponseDto[]> {
    if (!isApiConfigured()) {
      console.warn('GET /Nota ➜ Configura API_BASE_URL para habilitar la petición.');
      return of([]);
    }
    return this.http.get<NotaResponseDto[]>(this.resourceUrl);
  }

  create(payload: NotaCreateDto): Observable<NotaResponseDto | null> {
    if (!isApiConfigured()) {
      console.warn('POST /Nota ➜ Configura API_BASE_URL para habilitar la petición.', payload);
      return of(null);
    }
    return this.http.post<NotaResponseDto>(this.resourceUrl, payload);
  }
}
