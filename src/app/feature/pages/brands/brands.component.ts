import { Component, inject } from '@angular/core';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { Icategory } from '../../../core/models/icategory';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
private readonly brandsService = inject(BrandsService)
allBrands!:Icategory[]
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAllBrands()
}
getAllBrands()
{
  this.brandsService.getAllBrands().subscribe(
    {
      next:(res)=>{
        this.allBrands= res.data
      }
    }
  )
}
}
