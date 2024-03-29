import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Class/user';
import { Product } from '../Class/product';
import { CartOrder } from '../Class/CartOrder';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:9400';

  constructor(private http: HttpClient) { }

  public userSignUp(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/signup`, user);
  }

  public addProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add/product`, formData);
  }

  public getAllProduct(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/all-products`);
  }

  public getProductByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/products/${name}`);
  }

  public deleteProduct(pid: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/product/${pid}`);
  }

  public findById(pid: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-product/${pid}`);
  }

  public updateProduct(pid: number, product: Product): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/product/${pid}`, product);
  }

  public setAvailable(pid: number, product: Product): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/set-availability/product/${pid}`, product);
  }



//Order related apis

  public createOrder(CartOrder: CartOrder): Observable<CartOrder> {
    return this.http.post<CartOrder>(`${this.baseUrl}/user/create/order`, CartOrder);
  }

  public getOrderById(oid: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/order-invoice/${oid}`);
  }

  public getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/all/orders`);
  }

  public deleteOrder(oid: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/order/${oid}`);
  }

  public getOrderByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get/orders/${username}`);
  }
}
