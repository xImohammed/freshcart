import { Component, inject } from '@angular/core';
import { AllproductsService } from '../../../core/services/products/allProducts/allproducts.service';
import { IProduct } from '../../../core/models/iproduct';
import { ProductCardComponent } from "../../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly allProductsService = inject(AllproductsService)
    productsData:IProduct[]=[]
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProducts()
  }
  getAllProducts()
  {
    this.allProductsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productsData = res.data
      }
    })
  }
}
