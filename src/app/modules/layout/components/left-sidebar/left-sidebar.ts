import { CommonModule, NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-left-sidebar',
  imports: [CommonModule, NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.scss'
})
export class LeftSidebar {
  isOpen = true;
  isTutor = false;
  selectedOption: string | null = null;

  options= signal<any[]>([
    {
      id:1,
      description:'TODO'
    },
    {
      id:2,
      description:'Instituciones Educativas'
    },
    {
      id:3,
      description:'Centros de Salud'
    },
    {
      id:4,
      description:'Parques'
    },
  ])
  selection = signal<number[]>([]);
  // options = ['Explorar', 'Mis Proyectos', 'Configuración', 'Ayuda'];

  toggleSelection(id: number) {
    if (this.selection().includes(id)) {
      this.selection.update((prev) => prev.filter((item) => item !== id));
    } else {
      this.selection.update((prev) => [...prev, id]);
    }
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }
}
