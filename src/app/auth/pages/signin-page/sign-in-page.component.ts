import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signin-page',
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.css'
})
export class SignInPageComponent {

  private readonly fb          = inject( FormBuilder );
  private readonly authService = inject( AuthService );
  private readonly router      = inject( Router );

  public myForm: FormGroup = this.fb.group({
    email: ['facundo@google.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  });

  signIn() {

    const { email, password } = this.myForm.value;

    this.authService.signIn( email, password )
     .subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: ( message ) => {
        Swal.fire( 'Error', message, 'error' );
      }
     })
  }

}
