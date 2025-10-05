import { CommonModule } from '@angular/common';
import { Component, effect, input, output, signal } from '@angular/core';
import { SafeUrlPipe } from '../../../../shared/pipe/safe-url-pipe';

// Define la interfaz para los datos del PDF
interface PdfFile {
  id: number;
  name: string;
  url: string;
}
@Component({
  selector: 'app-modal-info',
  imports: [CommonModule,SafeUrlPipe],
  templateUrl: './modal-info.html',
  styleUrl: './modal-info.scss'
})
export class ModalInfo {
  // Input para recibir la lista de PDFs del componente padre
  pdfs = input<PdfFile[]>([]);
  // Output para emitir el evento de cierre al componente padre
  closeModal = output<void>();

  // Signal para el PDF seleccionado actualmente
  selectedPdf = signal<PdfFile | null>(null);

  // Inicializa el primer PDF como seleccionado cuando se cargan los datos
  constructor() {
    effect(() => {
      const allPdfs = this.pdfs();
      if (allPdfs && allPdfs.length > 0 && !this.selectedPdf()) {
        this.selectedPdf.set(allPdfs[0]);
      }
    });
  }

  // Método para seleccionar un PDF de la lista
  selectPdf(pdf: PdfFile) {
    this.selectedPdf.set(pdf);
  }

  // Método para cerrar el modal
  onClose() {
    this.closeModal.emit();
  }
}
