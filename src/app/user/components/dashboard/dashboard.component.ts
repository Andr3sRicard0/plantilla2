import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dataCarrousel: any[] = [];
  dataMercaderia: any[] = [];
  displayedMercaderia: any[] = [];
  itemsToLoad = 4;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMercaderiaData();
    this.loadCarrusel();
  }
  loadCarrusel(){
    this.http.get('assets/bd/carrouselData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.dataCarrousel = XLSX.utils.sheet_to_json(worksheet);
      //this.displayedHombre = this.dataHombre.slice(0, this.itemsToLoad); // Mostramos los primeros 8 elementos
    });
  }
  loadMercaderiaData() {
    // Ruta al archivo Excel en la carpeta 'assets'
    this.http.get('assets/bd/hombresData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.dataMercaderia = XLSX.utils.sheet_to_json(worksheet);
      this.displayedMercaderia = this.dataMercaderia.slice(0, this.itemsToLoad); // Mostramos los primeros 8 elementos
    });
  }
  loadMoreMercaderiaData() {
    const currentLength = this.displayedMercaderia.length;
    const nextLength = currentLength + this.itemsToLoad;
    // Si el próximo conjunto de elementos es mayor que el total disponible, simplemente mostramos todos los elementos.
    if (currentLength >= this.dataMercaderia.length) {
      Swal.fire({
        title: "No hay más items que cargar",
        text: "Son todos los artículos disponibles",
        icon: "info"
      });
      return; // Salimos de la función para evitar que se añadan elementos innecesarios.
    }
    // Aumentamos los elementos mostrados
    this.displayedMercaderia = this.dataMercaderia.slice(0, nextLength);
  }
}
