import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecificProductService } from '../../../core/services/products/specificProduct/specific-product.service';
import { IproductDetails } from '../../../core/models/iproduct-details';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/auth/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  standalone: true
})
export class ProductDetailsComponent {
  private readonly _activatedRouteService = inject(ActivatedRoute)
  private readonly _specificProductService = inject(SpecificProductService)
  private readonly _cartService = inject(CartService)
  private readonly _toastrService = inject(ToastrService)
  productId!: string
productData: IproductDetails = {} as IproductDetails;
  currentMainImage: string = ''; // To store the current main image
  loading: boolean = true;
  ngOnInit(): void {
    this._activatedRouteService.paramMap.subscribe({
      next: (parameters) => {
        this.productId = parameters.get('id')!
        this._specificProductService.getSpecificProduct(this.productId).subscribe({
          next: (res) => {
            // Ensure all nested objects exist
            this.productData = {
              ...res.data,
              brand: res.data.brand || { name: 'Unknown' },
              category: res.data.category || { name: 'Unknown' }
            };
            this.currentMainImage = this.productData.imageCover;
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
        })
      }
    })
  }

  // Function to change the main image when thumbnail is clicked
  changeMainImage(image: string): void {
    this.currentMainImage = image;
  }
  addToCart(pId:string)
  {
this._cartService.addToCart(pId).subscribe(
  {
    next:(res)=>{
      this._toastrService.success(res.message)
    }
  }
)
  }
}
