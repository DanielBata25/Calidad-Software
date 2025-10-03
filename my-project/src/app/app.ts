import { Component, signal } from '@angular/core';

import { AsignaturaSectionComponent } from './components/asignatura-section/asignatura-section.component';
import { ColegioSectionComponent } from './components/colegio-section/colegio-section.component';
import { EstudianteSectionComponent } from './components/estudiante-section/estudiante-section.component';
import { NotaSectionComponent } from './components/nota-section/nota-section.component';
import { PeriodoSectionComponent } from './components/periodo-section/periodo-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsignaturaSectionComponent,
    ColegioSectionComponent,
    EstudianteSectionComponent,
    NotaSectionComponent,
    PeriodoSectionComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Panel Colegio');
}
