import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;
  isScrolled = false;

  constructor(private eRef: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Cambia a true si el scroll es mayor que 50px
    this.isScrolled = window.pageYOffset > 50;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Verifica si el menú está abierto y si el clic ocurrió fuera del menú
    if (this.menuOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.menuOpen = false;
    }
  }

  toogleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  cerrarMenu() {
    this.menuOpen = false;
  }
}
