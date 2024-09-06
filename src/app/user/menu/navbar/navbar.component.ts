import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Cambia a true si el scroll es mayor que 100px
    this.isScrolled = window.pageYOffset > 50;
  }
  toogleMenu(){
    this.menuOpen = !this.menuOpen;
  }
}
