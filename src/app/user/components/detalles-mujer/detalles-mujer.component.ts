import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-detalles-mujer',
  templateUrl: './detalles-mujer.component.html',
  styleUrls: ['./detalles-mujer.component.css']
})
export class DetallesMujerComponent {
  id: string | null = null;
  dataMujer: any[] = [];
  mujer: any = null; // Variable para almacenar el objeto específico

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Captura el 'id' de la ruta
    this.loadMujerData();
  }

  loadMujerData() {
    // Ruta al archivo Excel en la carpeta 'assets'
    this.http.get('assets/bd/mujeresData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.dataMujer = XLSX.utils.sheet_to_json(worksheet);
      this.findMujerById();
    });
  }

  findMujerById() {
    if (this.id) {
      const idAsNumber = Number(this.id); // Convierte el id a número
      this.mujer = this.dataMujer.find(item => item.id === idAsNumber);
      if(this.mujer == null){
        this.router.navigate(['/not-found']);
      }
    }
  }
}
