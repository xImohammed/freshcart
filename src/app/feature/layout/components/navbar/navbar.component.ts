import { Component, computed, effect, HostListener, inject, input, Renderer2, Signal } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RouterLinkActive, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../../core/services/token/token.service';
import { CartService } from '../../../../core/auth/services/cart.service';
import { AllOrdersService } from '../../../../core/services/allOrders/all-orders.service';
import { AllOrders } from '../../../../core/models/all-orders';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';
import { UserstateService } from '../../../../core/services/userstate.service';

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
  userId!: string;

  private readonly _router = inject(Router);
  private readonly _tokenService = inject(TokenService);
  private readonly _cartService = inject(CartService);
  private readonly _allOrderService = inject(AllOrdersService);
  private readonly _wishListService = inject(WishlistService);
  private readonly _userstateService = inject(UserstateService);
  public counter:Signal<number| null> = computed(()=> this._cartService.numberOfCartItems()
  )
  public orders:Signal<number|null> = computed(()=>
    this._allOrderService.numberOfAllOrders()
  )
  public wishListCounter:Signal<number|null> = computed(
    ()=>
    {
      return this._wishListService.wishListItemsCounter()
    }
  )
  constructor()
  {
    effect(() => {
      if (this._userstateService.userChanged()) {
        this.getNumberOfCartItems();
        this.getNumberOfWishListItems();
        // If user data is updated, refresh token data and userId
        this._tokenService.getUserData();
        this.userId = this._tokenService.userId;
        this.getNumberOfOrders();
      }
    });
  }
  ngOnInit(): void {
    this.prevScrollPos = window.scrollY;
    this.menuOpen = false;
    this.  getNumberOfCartItems()
    this._tokenService.getUserData()
    this.userId = this._tokenService.userId;
    this.getNumberOfOrders()
    this.getNumberOfWishListItems()
  }
  getNumberOfCartItems()
  {
    this._cartService.getCarT().subscribe(
      {
        next:(res)=>{
          this._cartService.numberOfCartItems.set(res.numOfCartItems)
        }
      }
    )
  }
  getNumberOfWishListItems()
  {
    this._wishListService.getUserWishlist().subscribe(
      {
        next:(res)=>{
          this._wishListService.wishListItemsCounter.set(res.count)
        }
      }
    )
  }
  getNumberOfOrders()
  {
    this._allOrderService.getUserOrders(this.userId).subscribe(
      {
        next:(res:AllOrders[])=>
        {
          this._allOrderService.numberOfAllOrders.set(res.length)
        }
      }
    )
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('cartId');
    this._tokenService.userData = null;
    this._allOrderService.numberOfAllOrders.set(0)
    this._wishListService.wishListItemsCounter.set(0)
    this._cartService.numberOfCartItems.set(0)
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
