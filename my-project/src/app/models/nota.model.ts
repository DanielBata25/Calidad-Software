export interface NotaCreateDto {
  score: number;
  estudianteId: number;
  asignaturaId: number;
  periodoId: number;
}

export interface NotaResponseDto {
  id: number;
  score: number;
  estudianteNombre: string;
  asignaturaNombre: string;
  periodoNombre: string;
}
