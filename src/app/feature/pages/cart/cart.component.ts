import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../core/auth/services/cart.service';
import { Icart } from '../../../core/models/cart';
import { CurrencyPipe, CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

interface CartResponse {
  data: {
    products: Icart[];
    totalCartPrice: number;
  };
  cartId: string;
  message?: string;
}

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartData: Icart[] = [];
  totalCartPrice = 0;
  isLoading = false;
  isUpdating = false;
  private subscriptions: Subscription = new Subscription();

  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.getCartData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getCartData() {
    this.isLoading = true;
    this.subscriptions.add(
      this.cartService.getCarT().subscribe({
        next: (res: CartResponse) => {
          this.cartData = res.data.products;
          this.totalCartPrice = res.data.totalCartPrice;
          localStorage.setItem('cartId', res.cartId);
        },
        error: (err) => {
          console.error('Failed to fetch cart data:', err);
          Swal.fire('Error', 'Failed to fetch cart data', 'error');
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    );
  }

  deleteCartItem(pid: string) {
    this.isUpdating = true;
    this.subscriptions.add(
      this.cartService.deleteSpecificCartItem(pid).subscribe({
        next: (res) => {
          this.cartData = res.data.products;
          this.totalCartPrice = res.data.totalCartPrice;
          this.cartService.numberOfCartItems.set(res.numOfCartItems)
        },
        error: (err) => {
          console.error('Failed to delete cart item:', err);
          Swal.fire('Error', 'Failed to delete cart item', 'error');
        },
        complete: () => {
          this.isUpdating = false;
        }
      })
    );
  }

  updateSpecificItemQuantity(count: number, pId: string) {
    if (count < 1) return;
    this.isUpdating = true;

    this.subscriptions.add(
      this.cartService.updateSpecificItemQuantity(count, pId).subscribe({
        next: (res: CartResponse) => {
          this.cartData = res.data.products;
          this.totalCartPrice = res.data.totalCartPrice;
        },
        error: (err) => {
          console.error('Failed to update quantity:', err);
          Swal.fire('Error', 'Failed to update quantity', 'error');
        },
        complete: () => {
          this.isUpdating = false;
        }
      })
    );
  }

  clearAllCart() {
    this.isUpdating = true;
    this.subscriptions.add(
      this.cartService.clearAllCart().subscribe({
        next: (res: CartResponse) => {
          if (res.message === 'success') {
            this.cartData = [];
            this.totalCartPrice = 0;
            this.cartService.numberOfCartItems.set(0)
          }
        },
        error: (err) => {
          console.error('Failed to clear cart:', err);
          Swal.fire('Error', 'Failed to clear cart', 'error');
        },
        complete: () => {
          this.isUpdating = false;
        }
      })
    );
  }

  showAlertForDeleteAllCart() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clearAllCart();
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }

  showAlertForDeleteSpecificCartItem(pid: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCartItem(pid);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  }
}
