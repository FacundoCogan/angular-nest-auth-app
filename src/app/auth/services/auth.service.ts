import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environments';

import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, SignInResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.base_url;
  private readonly http = inject( HttpClient )

  private _currentUser = signal<User|null>( null );
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication( user: User, token: string ): boolean {
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem( 'token', token );

    return true;
  }

  signIn( email: string, password: string ): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/signin`;
    const body = { email, password };

    return this.http.post<SignInResponse>( url, body )
      .pipe(
        map( ( { user, token } ) => this.setAuthentication( user, token ) ),
        catchError( err => throwError( () => err.error.message ) )
      );
  }

  checkAuthStatus():Observable<boolean> {

    const url = `${ this.baseUrl }/auth/check-token`;
    const token = localStorage.getItem( 'token' );

    if ( !token ) {
      this.signOff();
      return of( false );
    };

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    return this.http.get<CheckTokenResponse>( url, { headers } )
      .pipe(
        map( ( { token, user } ) => this.setAuthentication( user, token ) ),
        catchError( () => {
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of( false )
        })
      );
  }

  signOff(): void {
    localStorage.removeItem( 'token' );
    this._currentUser.set( null );
    this._authStatus.set( AuthStatus.notAuthenticated );

  }

}
