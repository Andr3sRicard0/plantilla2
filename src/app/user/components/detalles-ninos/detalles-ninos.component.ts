import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-detalles-ninos',
  templateUrl: './detalles-ninos.component.html',
  styleUrls: ['./detalles-ninos.component.css']
})
export class DetallesNinosComponent {
  id: string | null = null;
  dataNinos: any[] = [];
  ninos: any = null; // Variable para almacenar el objeto específico

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Captura el 'id' de la ruta
    this.loadNinosData();
  }

  loadNinosData() {
    // Ruta al archivo Excel en la carpeta 'assets'
    this.http.get('assets/bd/ninosData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.dataNinos = XLSX.utils.sheet_to_json(worksheet);
      this.findNinosById();
    });
  }

  findNinosById() {
    if (this.id) {
      const idAsNumber = Number(this.id); // Convierte el id a número
      this.ninos = this.dataNinos.find(item => item.id === idAsNumber);
      if(this.ninos == null){
        this.router.navigate(['/not-found']);
      }
    }
  }
}
