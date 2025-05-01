import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgetPassService } from '../../services/forget-pass.service';
import { ResetPasswordService } from '../../services/reset-password.service';
import { VerifyCodeService } from '../../services/verify-code.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';
@Component({
  selector: 'app-forgetpass',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.scss'
})
export class ForgetpassComponent {
  private readonly _formBuilderService = inject(FormBuilder)
  private readonly _forgetPasswordService = inject(ForgetPassService)
  private readonly _resetPasswordService  = inject(ResetPasswordService)
  private readonly _verifyCodeService = inject(VerifyCodeService)
  private readonly _routerService = inject(Router)
  private readonly _tokenService = inject(TokenService)
  errorMessage!:string
  private _email!:string
  showAlert:boolean = false
  isLoading: boolean = false
  step: number = 1
  forgetPasswordForm!: FormGroup
  verifyCodeForm!: FormGroup
  resetPaswordForm!: FormGroup
  ngOnInit(): void {
    this.forgetPasswordForm = this._formBuilderService.group({
      email: [null, [Validators.required, Validators.email]]
    })
    this.verifyCodeForm = this._formBuilderService.group({
      resetCode: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]]
    })
    this.resetPaswordForm = this._formBuilderService.group({
      email: [null],
      newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/)]]
    })
  }
  forgetPassSubmitt(): void {
    if (this.forgetPasswordForm.valid) {
      this.isLoading = true
      this.resetPaswordForm.get('email')?.patchValue(this.forgetPasswordForm.get('email')?.value)
      this._forgetPasswordService.sendForgetPasswordData(this.forgetPasswordForm.value).subscribe(
        {
          next: (res) => {
            this.isLoading = false
            if (res.statusMsg === 'success') {
                this.step = 2
            }
          }, error: (err) => {
            this.isLoading = false
            this.showAlert = true
              this.errorMessage =err.error.message
              setTimeout(() => {
                this.showAlert = false
              }, 5000);
          }
        }
      )
    }
    else {
      this.forgetPasswordForm.markAllAsTouched()
    }

  }

  verifyCodeSubmitt():void {
    if(this.verifyCodeForm.valid)
    {
      this.isLoading=true
      this._verifyCodeService.sendVerifyCode(this.verifyCodeForm.value).subscribe(
        {
          next:(res)=>{
            if(res.status === 'Success')
            {
              this.isLoading=false
              this.step = 3
            }
          },
          error:(err)=>{
            this.isLoading=false
            this.showAlert = true
            this.errorMessage =err.error.message
            setTimeout(() => {
              this.showAlert = false
            }, 5000);
            this.errorMessage = err.error.message
          }

        }
      )
    }
    else
    {
      this.verifyCodeForm.markAllAsTouched()
    }
  }

  resetPasswordSubmitt():void {
    if(this.resetPaswordForm.valid)
    {
      this.isLoading=true

      this._resetPasswordService.sendResetPasswordData(this.resetPaswordForm.value).subscribe(
        {
          next:(res)=>{
            this.isLoading=false
            localStorage.setItem('userToken',res.token)
            this._tokenService.getUserData()
            this._routerService.navigate(['/home'])
          },
          error:(err)=>{
            this.isLoading=false
            this.showAlert = true
            this.errorMessage =err.error.message
            setTimeout(() => {
              this.showAlert = false
            }, 5000);
            this.errorMessage = err.error.message
          }
        }
      )
    }
    else
    {
      this.resetPaswordForm.markAllAsTouched()
    }
  }
}
