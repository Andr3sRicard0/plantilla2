import { ChangeDetectorRef, Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  currentSlide = 0;
  slides: HTMLElement[] = [];

  dataCarrousel: any[] = [];
  dataMercaderia: any[] = [];
  displayedMercaderia: any[] = [];
  itemsToLoad = 4;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(){
    this.loadMercaderiaData();
    this.loadCarrusel();
  }

  startCarousel() {
    setInterval(() => {
      this.slides[this.currentSlide].classList.remove('active');
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.slides[this.currentSlide].classList.add('active');
    }, 10000); // Cambia cada 10 segundos
  }

  loadCarrusel() {
    this.http.get('assets/bd/carrouselData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.dataCarrousel = XLSX.utils.sheet_to_json(worksheet);

      // Forzar la detección de cambios después de cargar los datos
      this.cdr.detectChanges();

      // Inicializar el carrusel después de que el DOM se haya actualizado
      this.slides = Array.from(document.querySelectorAll('.slideItem'));
      this.startCarousel();
    });
  }

  loadMercaderiaData() {
    this.http.get('assets/bd/mercaderiaData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.dataMercaderia = XLSX.utils.sheet_to_json(worksheet);
      this.displayedMercaderia = this.dataMercaderia.slice(0, this.itemsToLoad); // Mostramos los primeros 4 elementos
    });
  }

  loadMoreMercaderiaData() {
    const currentLength = this.displayedMercaderia.length;
    const nextLength = currentLength + this.itemsToLoad;
    if (currentLength >= this.dataMercaderia.length) {
      Swal.fire({
        title: "No hay más diseños por el momento.",
        text: "Mantente atento a nuestros sitios para ser de los primeros en adquirir nuestros productos.",
        icon: "info",
        iconColor: "#96003c",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#96003c", // Color del botón
        background: "#2c2c2c", // Color de fondo del alert
        color: "#ffffff" // Color del texto del alert
      });
      return;
    }
    this.displayedMercaderia = this.dataMercaderia.slice(0, nextLength);
  }
}
