import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  dataCarrousel: any[] = [];
  dataMercaderia: any[] = [];
  currentPageCarrousel: number = 1;
  currentPageMercaderia: number = 1;
  itemsPerPage: number = 5;
  searchTermCarrousel: string = '';
  searchTermMercaderia: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadCarrusel();
    this.loadMercaderia();
  }

  loadCarrusel() {
    this.http.get('assets/bd/carrouselData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      this.dataCarrousel = XLSX.utils.sheet_to_json(worksheet);
    });
  }

  loadMercaderia() {
    this.http.get('assets/bd/mercaderiaData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      this.dataMercaderia = XLSX.utils.sheet_to_json(worksheet);
      console.log("Mercaderia ", this.dataMercaderia);
    });
  }
  deleteItemMercaderia(id: string)
  {

  }

  get filteredCarrousel() {
    const searchTerm = this.searchTermCarrousel.toLowerCase();
    return this.dataCarrousel.filter(item =>
      item.nombre.toLowerCase().includes(searchTerm) ||
      item.id.toString().includes(searchTerm)
    );
  }

  get filteredMercaderia() {
    const searchTerm = this.searchTermMercaderia.toLowerCase();
    return this.dataMercaderia.filter(item =>
      item.nombre.toLowerCase().includes(searchTerm) ||
      item.id.toString().includes(searchTerm)
    );
  }

  get paginatedCarrousel() {
    const filtered = this.filteredCarrousel;
    const start = (this.currentPageCarrousel - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }

  get paginatedMercaderia() {
    const filtered = this.filteredMercaderia;
    const start = (this.currentPageMercaderia - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }

  changePageCarrousel(page: number) {
    this.currentPageCarrousel = Math.max(1, Math.min(page, this.totalPagesCarrousel));
  }

  changePageMercaderia(page: number) {
    this.currentPageMercaderia = Math.max(1, Math.min(page, this.totalPagesMercaderia));
  }

  get totalPagesCarrousel() {
    return Math.ceil(this.filteredCarrousel.length / this.itemsPerPage);
  }

  get totalPagesMercaderia() {
    return Math.ceil(this.filteredMercaderia.length / this.itemsPerPage);
  }
}