import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { EstudianteCreateDto, EstudianteResponseDto } from '../../models/estudiante.model';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-estudiante-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './estudiante-section.component.html',
  styleUrls: ['./estudiante-section.component.scss'],
})
export class EstudianteSectionComponent {
  private readonly fb = inject(FormBuilder);
  private readonly estudianteService = inject(EstudianteService);

  readonly estudiantes = signal<EstudianteResponseDto[]>([]);
  readonly loading = signal(false);
  readonly lastMessage = signal<string | null>(null);

  readonly createForm = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    colegioId: [0, [Validators.required, Validators.min(1)]],
  });

  readonly updateForm = this.fb.group({
    id: this.fb.control<number | null>(null, Validators.required),
    nombre: this.fb.control('', Validators.required),
    colegioId: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
  });

  readonly deleteForm = this.fb.group({
    id: this.fb.control<number | null>(null, Validators.required),
  });

  loadEstudiantes(): void {
    this.loading.set(true);
    this.lastMessage.set(null);
    this.estudianteService.getAll().subscribe({
      next: (list) => {
        this.estudiantes.set(list);
        this.lastMessage.set('Listado de estudiantes actualizado.');
      },
      error: () => {
        this.lastMessage.set('Error al cargar estudiantes. Conecta la API.');
      },
      complete: () => this.loading.set(false),
    });
  }

  createEstudiante(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const payload: EstudianteCreateDto = {
      nombre: this.createForm.controls.nombre.value.trim(),
      colegioId: this.createForm.controls.colegioId.value,
    };

    this.loading.set(true);
    this.lastMessage.set(null);
    this.estudianteService.create(payload).subscribe({
      next: (estudiante) => {
        this.lastMessage.set(estudiante ? 'Estudiante creado.' : 'Solicitud preparada. Conecta la API para persistir.');
        this.createForm.reset({ nombre: '', colegioId: 0 });
        this.loadEstudiantes();
      },
      error: () => {
        this.lastMessage.set('Error al crear estudiante. Conecta la API.');
        this.loading.set(false);
      },
    });
  }

  updateEstudiante(): void {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const id = this.updateForm.controls.id.value;
    if (id == null) {
      return;
    }

    const payload: EstudianteCreateDto = {
      nombre: this.updateForm.controls.nombre.value?.trim() ?? '',
      colegioId: this.updateForm.controls.colegioId.value ?? 0,
    };

    this.loading.set(true);
    this.lastMessage.set(null);
    this.estudianteService.update(id, payload).subscribe({
      next: () => {
        this.lastMessage.set('Estudiante actualizado.');
        this.updateForm.reset();
        this.loadEstudiantes();
      },
      error: () => {
        this.lastMessage.set('Error al actualizar estudiante. Conecta la API.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  deleteEstudiante(): void {
    if (this.deleteForm.invalid) {
      this.deleteForm.markAllAsTouched();
      return;
    }

    const id = this.deleteForm.controls.id.value;
    if (id == null) {
      return;
    }

    this.loading.set(true);
    this.lastMessage.set(null);
    this.estudianteService.delete(id).subscribe({
      next: () => {
        this.lastMessage.set('Estudiante eliminado.');
        this.deleteForm.reset();
        this.loadEstudiantes();
      },
      error: () => {
        this.lastMessage.set('Error al eliminar estudiante. Conecta la API.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
