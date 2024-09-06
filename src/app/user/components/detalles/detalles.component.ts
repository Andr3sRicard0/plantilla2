import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {
  @ViewChild('zoomLens', { static: false }) zoomLens!: ElementRef;
  id: string | null = null;
  dataMercancia: any[] = [];
  mercancia: any = null; // Variable para almacenar el objeto específico
  dataMercaderia: any[] = [];
  displayedMercaderia: any[] = [];
  itemsToLoad = 4;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Captura el 'id' de la ruta
    this.loadMercanciaData();
    this.loadMercaderiaData();
  }

  loadMercanciaData() {
    // Ruta al archivo Excel en la carpeta 'assets'
    this.http.get('assets/bd/mercaderiaData.xlsx', { responseType: 'arraybuffer' }).subscribe((response) => {
      const data = new Uint8Array(response);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      this.dataMercancia = XLSX.utils.sheet_to_json(worksheet);
      this.findMercanciaById();
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
        title: "No hay más items que cargar",
        text: "Son todos los artículos disponibles",
        icon: "info"
      });
      return;
    }
    this.displayedMercaderia = this.dataMercaderia.slice(0, nextLength);
  }
  findMercanciaById() {
    if (this.id) {
      const idAsNumber = Number(this.id); // Convierte el id a número
      this.mercancia = this.dataMercancia.find(item => item.id === idAsNumber);
      if(this.mercancia == null){
        this.router.navigate(['/not-found']);
      }
    }
  }
  zoomIn(event: MouseEvent): void {
    const zoomLens = this.zoomLens.nativeElement;
    const zoomImage = (event.target as HTMLElement);

    zoomLens.style.display = 'block'; // Muestra el cuadro de zoom

    // Obtén la posición del mouse dentro de la imagen
    const posX = event.offsetX;
    const posY = event.offsetY;

    // Configura la posición del cuadro de zoom
    zoomLens.style.left = `${posX - zoomLens.offsetWidth / 2}px`;
    zoomLens.style.top = `${posY - zoomLens.offsetHeight / 2}px`;

    // Configura el fondo del cuadro de zoom
    zoomLens.style.backgroundImage = `url(${zoomImage.getAttribute('src')})`;
    zoomLens.style.backgroundSize = `${zoomImage.offsetWidth * 2}px ${zoomImage.offsetHeight * 2}px`;
    zoomLens.style.backgroundPosition = `-${posX * 1.5}px -${posY * 1.75}px`;
  }

  zoomOut(): void {
    this.zoomLens.nativeElement.style.display = 'none'; // Oculta el cuadro de zoom
  }
}
