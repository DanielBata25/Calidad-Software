import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AsignaturaCreateDto, AsignaturaResponseDto } from '../../models/asignatura.model';
import { AsignaturaService } from '../../services/asignatura.service';

@Component({
  selector: 'app-asignatura-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './asignatura-section.component.html',
  styleUrls: ['./asignatura-section.component.scss'],
})
export class AsignaturaSectionComponent {
  private readonly fb = inject(FormBuilder);
  private readonly asignaturaService = inject(AsignaturaService);

  readonly asignaturas = signal<AsignaturaResponseDto[]>([]);
  readonly loading = signal(false);
  readonly lastMessage = signal<string | null>(null);

  readonly createForm = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
  });

  readonly updateForm = this.fb.group({
    id: this.fb.control<number | null>(null, { validators: [Validators.required] }),
    nombre: this.fb.control('', { validators: [Validators.required] }),
  });

  readonly deleteForm = this.fb.group({
    id: this.fb.control<number | null>(null, { validators: [Validators.required] }),
  });

  loadAsignaturas(): void {
    this.loading.set(true);
    this.lastMessage.set(null);
    this.asignaturaService.getAll().subscribe({
      next: (list) => {
        this.asignaturas.set(list);
        this.lastMessage.set('Listado de asignaturas actualizado.');
      },
      error: () => {
        this.lastMessage.set('Error al cargar asignaturas. Revisa la conexion con la API.');
      },
      complete: () => this.loading.set(false),
    });
  }

  createAsignatura(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const payload: AsignaturaCreateDto = {
      nombre: this.createForm.controls.nombre.value.trim(),
    };

    this.loading.set(true);
    this.lastMessage.set(null);
    this.asignaturaService.create(payload).subscribe({
      next: (response) => {
        this.lastMessage.set(response ? 'Asignatura creada.' : 'Solicitud preparada. Conecta la API para persistir.');
        this.createForm.reset({ nombre: '' });
        this.loadAsignaturas();
      },
      error: () => {
        this.lastMessage.set('Error al crear asignatura. Revisa la conexion con la API.');
        this.loading.set(false);
      },
    });
  }

  updateAsignatura(): void {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const id = this.updateForm.controls.id.value;
    if (id == null) {
      return;
    }

    const payload: AsignaturaCreateDto = {
      nombre: this.updateForm.controls.nombre.value?.trim() ?? '',
    };

    this.loading.set(true);
    this.lastMessage.set(null);
    this.asignaturaService.update(id, payload).subscribe({
      next: () => {
        this.lastMessage.set('Asignatura actualizada.');
        this.updateForm.reset();
        this.loadAsignaturas();
      },
      error: () => {
        this.lastMessage.set('Error al actualizar asignatura. Revisa la conexion con la API.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  deleteAsignatura(): void {
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
    this.asignaturaService.delete(id).subscribe({
      next: () => {
        this.lastMessage.set('Asignatura eliminada.');
        this.deleteForm.reset();
        this.loadAsignaturas();
      },
      error: () => {
        this.lastMessage.set('Error al eliminar asignatura. Revisa la conexion con la API.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
