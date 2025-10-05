import { CommonModule, NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule,NgClass, ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;
  
  isSearching: boolean = false;

  toggleSearch(shouldOpen: boolean): void {
    this.isSearching = shouldOpen;

    if (shouldOpen) {
      // El timeout es CRUCIAL para que Angular termine la transición de 'isSearching'
      // y renderice el input antes de intentar enfocarlo.
      setTimeout(() => {
        if (this.searchInputRef) {
          this.searchInputRef.nativeElement.focus();
        }
      }, 50); // Un pequeño retraso de 50ms es suficiente para la fluidez
    }
  }

  performSearch(query: string): void {
    if (query.trim()) {
      console.log(`Buscando en el mundo 3D: "${query}"`);
      // Lógica de búsqueda...
      
      // Opcional: Cierra el buscador después de la búsqueda si no es necesario mantenerlo abierto
      // this.toggleSearch(false);
    }
  }
}
