import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ColegioCreateDto, ColegioResponseDto } from '../../models/colegio.model';
import { ColegioService } from '../../services/colegio.service';

@Component({
  selector: 'app-colegio-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './colegio-section.component.html',
  styleUrls: ['./colegio-section.component.scss'],
})
export class ColegioSectionComponent {
  private readonly fb = inject(FormBuilder);
  private readonly colegioService = inject(ColegioService);

  readonly colegios = signal<ColegioResponseDto[]>([]);
  readonly selectedColegio = signal<ColegioResponseDto | null>(null);
  readonly loading = signal(false);
  readonly lastMessage = signal<string | null>(null);

  readonly searchForm = this.fb.group({
    id: this.fb.control<number | null>(null, Validators.required),
  });

  readonly createForm = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    maxEstudiantes: [0, [Validators.required, Validators.min(1)]],
  });

  readonly updateForm = this.fb.group({
    id: this.fb.control<number | null>(null, Validators.required),
    nombre: this.fb.control('', Validators.required),
    maxEstudiantes: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
  });

  readonly deleteForm = this.fb.group({
    id: this.fb.control<number | null>(null, Validators.required),
  });

  loadColegios(): void {
    this.loading.set(true);
    this.lastMessage.set(null);
    this.colegioService.getAll().subscribe({
      next: (list) => {
        this.colegios.set(list);
        this.lastMessage.set('Listado de colegios actualizado.');
      },
      error: () => {
        this.lastMessage.set('Error al cargar colegios. Conecta la API.');
      },
      complete: () => this.loading.set(false),
    });
  }

  searchColegio(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const id = this.searchForm.controls.id.value;
    if (id == null) {
      return;
    }

    this.loading.set(true);
    this.lastMessage.set(null);
    this.colegioService.getById(id).subscribe({
      next: (colegio) => {
        this.selectedColegio.set(colegio ?? null);
        this.lastMessage.set(colegio ? `Colegio ${colegio.nombre} encontrado.` : 'Sin registros para ese identificador.');
      },
      error: () => {
        this.lastMessage.set('Error al consultar colegio. Conecta la API.');
      },
      complete: () => this.loading.set(false),
    });
  }

  createColegio(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const payload: ColegioCreateDto = {
      nombre: this.createForm.controls.nombre.value.trim(),
      maxEstudiantes: this.createForm.controls.maxEstudiantes.value,
    };

    this.loading.set(true);
    this.lastMessage.set(null);
    this.colegioService.create(payload).subscribe({
      next: (colegio) => {
        this.lastMessage.set(colegio ? 'Colegio creado.' : 'Solicitud preparada. Conecta la API para persistir.');
        this.createForm.reset({ nombre: '', maxEstudiantes: 0 });
        this.loadColegios();
      },
      error: () => {
        this.lastMessage.set('Error al crear colegio. Conecta la API.');
        this.loading.set(false);
      },
    });
  }

  updateColegio(): void {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const id = this.updateForm.controls.id.value;
    if (id == null) {
      return;
    }

    const payload: ColegioCreateDto = {
      nombre: this.updateForm.controls.nombre.value?.trim() ?? '',
      maxEstudiantes: this.updateForm.controls.maxEstudiantes.value ?? 0,
    };

    this.loading.set(true);
    this.lastMessage.set(null);
    this.colegioService.update(id, payload).subscribe({
      next: () => {
        this.lastMessage.set('Colegio actualizado.');
        this.updateForm.reset();
        this.loadColegios();
      },
      error: () => {
        this.lastMessage.set('Error al actualizar colegio. Conecta la API.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  deleteColegio(): void {
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
    this.colegioService.delete(id).subscribe({
      next: () => {
        this.lastMessage.set('Colegio eliminado.');
        this.deleteForm.reset();
        this.loadColegios();
      },
      error: () => {
        this.lastMessage.set('Error al eliminar colegio. Conecta la API.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
