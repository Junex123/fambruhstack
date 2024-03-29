import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CartItemResponseDto } from '../Class/CartItemResponseDto';
import { Product } from '../Class/product';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:9400';
  private cartCountSubject: BehaviorSubject<number>; // Initialize cart count subject
  public cartCount$: Observable<number>; // Observable for cart count
  public cartItems: CartItemResponseDto[] = []; // Define cartItems property
  public totalPrice: BehaviorSubject<number>; // Define totalPrice property

  constructor(private http: HttpClient, private loginService: LoginService) {
    // Initialize cart count subject with initial value from local storage or default to 0k
    const initialCount = Number(localStorage.getItem('cartCount')) || 0;
    this.cartCountSubject = new BehaviorSubject<number>(initialCount);
    this.cartCount$ = this.cartCountSubject.asObservable();

    // Initialize totalPrice subject with initial value of 0
    this.totalPrice = new BehaviorSubject<number>(0);
  }

  addToCart(product: Product, quantity: number): Observable<any> {
    const userDetails = this.loginService.getUserDetails();
    const username = userDetails.username;
    this.cartCountSubject.next(this.cartCountSubject.value + 1); // Increment cart count
    // Store updated cart count in local storage
    localStorage.setItem('cartCount', String(this.cartCountSubject.value));
    return this.http.post<any>(`${this.baseUrl}/cart/add?quantity=${quantity}&username=${username}`, product);
  }

  getCartDetails(username: string): Observable<CartItemResponseDto[]> {
    return this.http.get<CartItemResponseDto[]>(`${this.baseUrl}/cart?username=${username}`).pipe(
      tap((items: CartItemResponseDto[]) => {
        this.cartItems = items; // Update cartItems property
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  deleteCartItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/${id}`).pipe(
      tap(() => {
        // Decrement cart count when item is successfully removed
        if (this.cartCountSubject.value > 0) {
          this.cartCountSubject.next(this.cartCountSubject.value - 1);
          // Store updated cart count in local storage
          localStorage.setItem('cartCount', String(this.cartCountSubject.value));
        }
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  calculateTotalPrice() {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.product.price * item.quantity;
    }
    this.totalPrice.next(total);
  }

  // Add more methods as needed...

}
