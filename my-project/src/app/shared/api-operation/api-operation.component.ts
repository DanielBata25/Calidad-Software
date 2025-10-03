import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-api-operation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-operation.component.html',
  styleUrls: ['./api-operation.component.scss'],
})
export class ApiOperationComponent {
  @Input({ required: true }) method!: 'GET' | 'POST' | 'PUT' | 'DELETE';
  @Input({ required: true }) path!: string;
  @Input() description = '';
  @Input() startOpen = false;
  @Input() disabled = false;

  @Output() toggled = new EventEmitter<boolean>();

  protected readonly expanded = signal(false);

  ngOnInit(): void {
    this.expanded.set(this.startOpen);
  }

  toggle(): void {
    if (this.disabled) {
      return;
    }

    this.expanded.update((value) => !value);
    this.toggled.emit(this.expanded());
  }

  protected methodClass(): string {
    switch (this.method) {
      case 'POST':
        return 'method-post';
      case 'PUT':
        return 'method-put';
      case 'DELETE':
        return 'method-delete';
      default:
        return 'method-get';
    }
  }
}
