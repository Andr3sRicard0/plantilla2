import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent {
  dataCarrousel: any[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.loadCarrusel();
  }
  loadCarrusel() {
    this.http.get('assets/bd/carrouselData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.dataCarrousel = XLSX.utils.sheet_to_json(worksheet);
      //this.displayedHombre = this.dataHombre.slice(0, this.itemsToLoad); // Mostramos los primeros 8 elementos
    });
  }
  validarYEnviar() {
    const nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
    const contactame = (<HTMLInputElement>document.getElementById('contactame')).value;
    const asunto = (<HTMLInputElement>document.getElementById('asunto')).value;

    if (!nombre || !contactame || !asunto) {
      Swal.fire({
        title: "Rellene todos los campos",
        text: "Requerimos de toda su información para comunicarnos con usted",
        icon: "error"
      });
      return; // Detener la ejecución si hay campos vacíos
    }
    Swal.fire({
      title: "¿Estás seguro de enviar el email?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Enviar",
      denyButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Enviando correo, Redirigiendo!!!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Correo no enviado", "", "error");
        return;
      }
    });
    // Si todos los campos están llenos, envía el formulario
    const formulario = <HTMLFormElement>document.getElementById('contactForm');
    formulario.submit(); // Enviar el formulario manualmente
  }
}
