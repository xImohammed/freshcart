import { Component, HostListener, inject, input, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../../core/services/token/token.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state('out', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition('out => in', animate('300ms ease-in')),
      transition('in => out', animate('300ms ease-out'))
    ])
  ]
})
export class NavbarComponent {
  isLogin = input<boolean>(false);
  menuOpen: boolean = false;
  isDarkMode = false;
  isScrolled = false;
  prevScrollPos = 0;
  visible = true;
  isNavbarVisible = true;

  private readonly _router = inject(Router);
  private readonly _tokenService = inject(TokenService);

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.prevScrollPos = window.scrollY;
    this.menuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('cartId');
    this._tokenService.userData = null;
    this.menuOpen = false;
    this._router.navigate(['/login']);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const burgerButton = document.querySelector('.navbar-burger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (burgerButton && burgerButton.contains(event.target as Node)) {
      return;
    }

    if (this.menuOpen && mobileMenu && !mobileMenu.contains(event.target as Node)) {
      this.menuOpen = false;
    }
  }
}
