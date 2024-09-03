import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-detalles-hombre',
  templateUrl: './detalles-hombre.component.html',
  styleUrls: ['./detalles-hombre.component.css']
})
export class DetallesHombreComponent {
  id: string | null = null;
  dataHombre: any[] = [];
  hombre: any = null; // Variable para almacenar el objeto específico

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Captura el 'id' de la ruta
    this.loadHombreData();
  }

  loadHombreData() {
    // Ruta al archivo Excel en la carpeta 'assets'
    this.http.get('assets/bd/hombresData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.dataHombre = XLSX.utils.sheet_to_json(worksheet);
      this.findHombreById();
    });
  }

  findHombreById() {
    if (this.id) {
      const idAsNumber = Number(this.id); // Convierte el id a número
      this.hombre = this.dataHombre.find(item => item.id === idAsNumber);
      if(this.hombre == null){
        this.router.navigate(['/not-found']);
      }
    }
  }

}
