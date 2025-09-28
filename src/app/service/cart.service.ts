import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  private alertSubject = new Subject<string>();
  alert$ = this.alertSubject.asObservable();

  private items: any[] = [];

  addToCart(product: any) {
    this.items.push({ ...product, selectedQty: 1 });
    this.cartCountSubject.next(this.items.length);
    this.alertSubject.next(`${product.title} Was Added To cart!`);
  }

  removeFromCart(productId: string) {
    this.items = this.items.filter(p => p.id !== productId);
    this.cartCountSubject.next(this.items.length);
  }

  getCartItems() {
    return [...this.items];
  }
}
