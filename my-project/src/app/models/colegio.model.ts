import { EstudianteResponseDto } from './estudiante.model';

export interface ColegioCreateDto {
  nombre: string;
  maxEstudiantes: number;
}

export interface ColegioResponseDto {
  id: number;
  nombre: string;
  maxEstudiantes: number;
  estudiantes: EstudianteResponseDto[];
}
