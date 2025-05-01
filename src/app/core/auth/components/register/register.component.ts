import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpService } from '../../services/sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly signUpService = inject(SignUpService)
  private readonly routerService = inject(Router)
  isloading:boolean = false
  successMessage !:string
  errorMessage!:string
  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Za-z]{2,}(?: [A-Za-z]{2,})+$/)]),
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)])
  },this.confirmPassword)
  confirmPassword(groub:AbstractControl)
  {
    const password = groub.get('password')?.value
    const repassword = groub.get('rePassword')?.value
    return password === repassword ? null : { mismatched : true }
  }
  registerFormSubmitt()
  {
    if(this.registerForm.valid)
    {
      this.isloading = true
      this.signUpService.sendRegisterFormData(this.registerForm.value).subscribe(
        {
          next:(res)=>{
            this.isloading = false
            this.successMessage = res.message
            if(res.message === 'success')
            {
              setTimeout(() => {
                this.routerService.navigate(['/login'])
              }, 2000);
            }
          },
          error:(err)=>{
            this.isloading = false
            console.log(err);
            this.errorMessage = err.error.message
          }
        }
      )
    }
    else
    {
      this.registerForm.markAllAsTouched()
    }

  }
}
