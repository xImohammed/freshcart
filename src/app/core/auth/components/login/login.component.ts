import { UserstateService } from './../../../services/userstate.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInService } from '../../services/sign-in.service';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly loginService = inject(SignInService)
  private readonly routerService = inject(Router)
  private readonly tokenService = inject(TokenService)
  private readonly _userStateService = inject(UserstateService)
  isloading:boolean  = false
  successMessage!:string
  errorMessage!:string
loginForm = new FormGroup({
  email : new FormControl(null,[Validators.required,Validators.email]),
  password : new FormControl(null,[Validators.required])
})
loginSubmit()
{

  if(this.loginForm.valid){
    this.isloading = true
    this.loginService.sendLoginFormData(this.loginForm.value).subscribe({
      next:(res)=> {
        this.isloading = false
        this.successMessage = res.message

        if(res.message === 'success')
        {
          localStorage.setItem('userToken',res.token)
          this.tokenService.getUserData()
          this._userStateService.triggerUserChange()
          setTimeout(() => {
            this.routerService.navigate(['/home'])
          }, 2000);
        }
      },
      error:(err)=> {
        this.isloading = false
        this.errorMessage = err.error.message
      }
    })
  }
  else{
    this.loginForm.markAllAsTouched()
  }

}
}
