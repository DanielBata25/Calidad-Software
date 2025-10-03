import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NotaCreateDto, NotaResponseDto } from '../../models/nota.model';
import { NotaService } from '../../services/nota.service';

@Component({
  selector: 'app-nota-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nota-section.component.html',
  styleUrls: ['./nota-section.component.scss'],
})
export class NotaSectionComponent {
  private readonly fb = inject(FormBuilder);
  private readonly notaService = inject(NotaService);

  readonly notas = signal<NotaResponseDto[]>([]);
  readonly loading = signal(false);
  readonly lastMessage = signal<string | null>(null);

  readonly createForm = this.fb.nonNullable.group({
    score: [0, [Validators.required]],
    estudianteId: [0, [Validators.required, Validators.min(1)]],
    asignaturaId: [0, [Validators.required, Validators.min(1)]],
    periodoId: [0, [Validators.required, Validators.min(1)]],
  });

  loadNotas(): void {
    this.loading.set(true);
    this.lastMessage.set(null);
    this.notaService.getAll().subscribe({
      next: (list) => {
        this.notas.set(list);
        this.lastMessage.set('Listado de notas actualizado.');
      },
      error: () => {
        this.lastMessage.set('Error al cargar notas. Conecta la API.');
      },
      complete: () => this.loading.set(false),
    });
  }

  createNota(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const payload: NotaCreateDto = {
      score: this.createForm.controls.score.value,
      estudianteId: this.createForm.controls.estudianteId.value,
      asignaturaId: this.createForm.controls.asignaturaId.value,
      periodoId: this.createForm.controls.periodoId.value,
    };

    this.loading.set(true);
    this.lastMessage.set(null);
    this.notaService.create(payload).subscribe({
      next: (nota) => {
        this.lastMessage.set(nota ? 'Nota registrada.' : 'Solicitud preparada. Conecta la API para persistir.');
        this.createForm.reset({ score: 0, estudianteId: 0, asignaturaId: 0, periodoId: 0 });
        this.loadNotas();
      },
      error: () => {
        this.lastMessage.set('Error al registrar nota. Conecta la API.');
        this.loading.set(false);
      },
    });
  }
}
