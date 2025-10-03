export interface EstudianteCreateDto {
  nombre: string;
  colegioId: number;
}

export interface EstudianteResponseDto {
  id: number;
  nombre: string;
  colegioId: number;
  colegioNombre: string;
}
