import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckOutService } from '../../../core/services/check-out/check-out.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent {
private readonly checkOutService = inject(CheckOutService)
private readonly formBuilder = inject(FormBuilder)
shippingForm!:FormGroup
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.shippingForm  = this.formBuilder.group({
    details:[null,[Validators.required]],
    phone:[null,[Validators.required]],
    city:[null,[Validators.required]]
  })
}

onSubmit() {
  if (this.shippingForm.valid) {
    this.checkOutService.checkOut(localStorage.getItem('cartId') !,this.shippingForm.value).subscribe(
      {
        next:(res:any)=>{
          if(res.status === 'success')
          {
            open(res.session.url)
          }
        }
      }
    )
  } else {
    this.shippingForm.markAllAsTouched();
  }
}
}
