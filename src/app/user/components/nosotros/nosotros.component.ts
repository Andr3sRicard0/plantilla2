import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent {
  @ViewChild('mensajeWhatsapp') mensajeWhatsapp!: ElementRef<HTMLTextAreaElement>;
  phoneNumber: number = 593983101686;
  currentSlide = 0;
  slides: HTMLElement[] = [];
  dataCarrousel: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

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

      // Forzar la detección de cambios después de cargar los datos
      this.cdr.detectChanges();

      // Inicializar el carrusel después de que el DOM se haya actualizado
      this.slides = Array.from(document.querySelectorAll('.slideItem'));
      this.startCarousel();
    });
  }
  startCarousel() {
    setInterval(() => {
      this.slides[this.currentSlide].classList.remove('active');
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.slides[this.currentSlide].classList.add('active');
    }, 10000); // Cambia cada 10 segundos
  }
  enviarMensaje() {
    const mensajeTextArea: string = this.mensajeWhatsapp.nativeElement.value;
    if (mensajeTextArea == "") {
      Swal.fire({
        title: "Mensaje Vacío",
        text: "Rellena el motivo por el cual quieres contactarnos.",
        icon: "error",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#fc030b", // Color del botón
        background: "#2c2c2c", // Color de fondo del alert
        color: "#ffffff" // Color del texto del alert
      });
      return;
    }
    Swal.fire({
      title: "¿Estás seguro de enviar el mensaje?",
      text: "Esto enviará el mensaje que has escrito.",
      icon: "warning",
      showCancelButton: true, // Muestra el botón de cancelar
      confirmButtonText: "Enviar Mensaje",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#008f96",
      cancelButtonColor: "#dc3545",
      background: "#2c2c2c",
      color: "#ffffff",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const message = `${mensajeTextArea}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send/?phone=${encodeURIComponent(this.phoneNumber)}&text=${encodedMessage}&type=phone_number&app_absent=0`;
        window.location.href = whatsappUrl;
      } else {
        return;
      }
    });
  }
}
