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
  dataHombre: any[] = [];
  displayedHombre: any[] = [];
  dataMujer: any[] = [];
  displayedMujer: any[] = [];  
  dataNinos: any[] = [];
  displayedNinos: any[] = [];  
  itemsToLoad = 5;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHombreData();
    this.loadMujerData();
    this.loadNinoData();
  }

  loadHombreData() {
    // Ruta al archivo Excel en la carpeta 'assets'
    this.http.get('assets/bd/hombresData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.dataHombre = XLSX.utils.sheet_to_json(worksheet);
      this.displayedHombre = this.dataHombre.slice(0, this.itemsToLoad); // Mostramos los primeros 8 elementos
    });
  }
  loadMoreHombreData() {
    const currentLength = this.displayedHombre.length;
    const nextLength = currentLength + this.itemsToLoad;
    // Si el próximo conjunto de elementos es mayor que el total disponible, simplemente mostramos todos los elementos.
    if (currentLength >= this.dataHombre.length) {
      Swal.fire({
        title: "No hay más items que cargar",
        text: "Son todos los artículos disponibles",
        icon: "info"
      });
      return; // Salimos de la función para evitar que se añadan elementos innecesarios.
    }
    // Aumentamos los elementos mostrados
    this.displayedHombre = this.dataHombre.slice(0, nextLength);
  }
  loadMujerData() {
    // Ruta al archivo Excel en la carpeta 'assets'
    this.http.get('assets/bd/mujeresData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.dataMujer = XLSX.utils.sheet_to_json(worksheet);
      this.displayedMujer = this.dataMujer.slice(0, this.itemsToLoad); // Mostramos los primeros 8 elementos
    });
  }
  loadMoreMujerData() {
    const currentLength = this.displayedMujer.length;
    const nextLength = currentLength + this.itemsToLoad;
    if (currentLength >= this.dataMujer.length) {
      Swal.fire({
        title: "No hay más items que cargar",
        text: "Son todos los artículos disponibles",
        icon: "info"
      });
      return;
    }
    this.displayedMujer = this.dataMujer.slice(0, nextLength);
  }
  loadNinoData() {
    // Ruta al archivo Excel en la carpeta 'assets'
    this.http.get('assets/bd/ninosData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.dataNinos = XLSX.utils.sheet_to_json(worksheet);
      this.displayedNinos = this.dataNinos.slice(0, this.itemsToLoad); // Mostramos los primeros 8 elementos
    });
  }
  loadMoreNinosData() {
    const currentLength = this.displayedNinos.length;
    const nextLength = currentLength + this.itemsToLoad;
    if (currentLength >= this.dataNinos.length) {
      Swal.fire({
        title: "No hay más items que cargar",
        text: "Son todos los artículos disponibles",
        icon: "info"
      });
      return;
    }
    this.displayedNinos = this.dataNinos.slice(0, nextLength); // Aumentamos los elementos mostrados
  }
}
