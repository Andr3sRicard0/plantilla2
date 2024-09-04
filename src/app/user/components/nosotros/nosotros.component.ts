import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent {
  dataCarrousel: any[] = [];
constructor(private http: HttpClient) {}
ngOnInit(): void {
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
}
