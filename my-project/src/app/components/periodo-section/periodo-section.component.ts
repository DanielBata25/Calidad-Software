import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PeriodoCreateDto, PeriodoResponseDto } from '../../models/periodo.model';
import { PeriodoService } from '../../services/periodo.service';

@Component({
  selector: 'app-periodo-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './periodo-section.component.html',
  styleUrls: ['./periodo-section.component.scss'],
})
export class PeriodoSectionComponent {
  private readonly fb = inject(FormBuilder);
  private readonly periodoService = inject(PeriodoService);

  readonly periodos = signal<PeriodoResponseDto[]>([]);
  readonly loading = signal(false);
  readonly lastMessage = signal<string | null>(null);

  readonly createForm = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    porcentaje: [0, [Validators.required, Validators.min(1)]],
  });

  loadPeriodos(): void {
    this.loading.set(true);
    this.lastMessage.set(null);
    this.periodoService.getAll().subscribe({
      next: (list) => {
        this.periodos.set(list);
        this.lastMessage.set('Listado de periodos actualizado.');
      },
      error: () => {
        this.lastMessage.set('Error al cargar periodos. Conecta la API.');
      },
      complete: () => this.loading.set(false),
    });
  }

  createPeriodo(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const payload: PeriodoCreateDto = {
      nombre: this.createForm.controls.nombre.value.trim(),
      porcentaje: this.createForm.controls.porcentaje.value,
    };

    this.loading.set(true);
    this.lastMessage.set(null);
    this.periodoService.create(payload).subscribe({
      next: (periodo) => {
        this.lastMessage.set(periodo ? 'Periodo creado.' : 'Solicitud preparada. Conecta la API para persistir.');
        this.createForm.reset({ nombre: '', porcentaje: 0 });
        this.loadPeriodos();
      },
      error: () => {
        this.lastMessage.set('Error al crear periodo. Conecta la API.');
        this.loading.set(false);
      },
    });
  }
}
