import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SignInPageComponent } from './pages/signin-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/signup-page/sign-up-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SignInPageComponent
      },
      {
        path: 'signup',
        component: SignUpPageComponent
      },
      {
        path: '**',
        redirectTo: 'signin'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
