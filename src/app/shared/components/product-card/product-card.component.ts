import { ToastrService } from 'ngx-toastr';
import { Component, inject, Input, input } from '@angular/core';
import { IProduct } from '../../../core/models/iproduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/auth/services/cart.service';
@Component({
  selector: 'app-product-card',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
@Input() product!:IProduct
private readonly cartService = inject(CartService)
private readonly toastrService = inject(ToastrService)
addToCart(pId:string)
{
  this.cartService.addToCart(pId).subscribe(
    {
      next:(res)=>{
        this.toastrService.success(res.message)
      }
    }
  )
}

}
