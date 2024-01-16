import { Injectable } from '@angular/core';
import { SocialAuthService,GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_KEY = 'auth_data';
  user!: SocialUser;
  
  constructor(private authService: SocialAuthService,private router:Router) {
    // this.authService.authState.subscribe((user)=>{
    //   this.user=user;
    // });

    const authData = localStorage.getItem(this.AUTH_KEY);
    if (authData) {
      this.user = JSON.parse(authData);
    }

    this.authService.authState.subscribe((user) => {
      this.user = user;

      // Store user data in localStorage upon successful login
      if (user) {
        localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
      } else {
        // Clear localStorage on logout
        localStorage.removeItem(this.AUTH_KEY);
      }
    });
   }

   signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
   }

   signOut(): void {
    console.log("signout ");
    
    localStorage.removeItem(this.AUTH_KEY);
    
    this.authService.signOut();
    // location.reload();
    // this.router.navigate(['/']);
    
   }

   isAuthorized(): boolean{
    
    const authorizedDomain = 'ietdavv.edu.in';
    const userEmail = this.user ? this.user.email : '';
    const isEmailValid = userEmail.endsWith(`@${authorizedDomain}`);

    
    const startsWithNumber = /^\d/.test(userEmail);

    return this.user && isEmailValid && startsWithNumber;
   }
}
