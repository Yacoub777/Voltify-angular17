import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'cartItems';
  private items: any[] = [];

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  private alertSubject = new Subject<{ message: string; type: 'success' | 'warning' }>();
  alert$ = this.alertSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  // ✅ إضافة منتج للسلة
  addToCart(product: any) {
    const existingItem = this.items.find(p => p.id === product.id);

    if (existingItem) {
      this.alertSubject.next({
        message: `${product.title} is already in your cart. You can change the quantity from the cart.`,
        type: 'warning'
      });
    } else {
      this.items.push({ ...product, selectedQty: 1 });
      this.updateCartState();
      this.alertSubject.next({
        message: `${product.title} was added to cart!`,
        type: 'success'
      });
    }
  }

  // ✅ حذف منتج من السلة
  removeFromCart(productId: string) {
    this.items = this.items.filter(p => p.id !== productId);
    this.updateCartState();
  }

  // ✅ جلب جميع المنتجات في السلة
  getCartItems() {
    return [...this.items];
  }

  // ✅ مسح السلة بالكامل (يُستخدم عند الدفع أو الضغط على Clear All)
  clearCart() {
    this.items = [];
    this.cartCountSubject.next(0); // تصفير العداد فورًا
    this.removeCartFromStorage();
  }

// ✅ حفظ الطلب بعد الدفع
private ordersSubject = new BehaviorSubject<any[]>(this.loadOrders());
  orders$ = this.ordersSubject.asObservable();

  private loadOrders(): any[] {
    if (this.isBrowser()) {
      return JSON.parse(localStorage.getItem('ordersHistory') || '[]');
    }
    return [];
  }

  saveOrder(order: any, paymentMethod: string) {
    if (this.isBrowser()) {
      const orders = this.loadOrders();
      const newOrder = { ...order, paymentMethod };
      orders.unshift(newOrder); // أحدث طلب أول
      localStorage.setItem('ordersHistory', JSON.stringify(orders));
      this.ordersSubject.next(orders); // ⬅️ يحدث كل المشتركين
    }
  }

// ✅ مسح جميع الطلبات من localStorage
clearOrders() {
  if (this.isBrowser()) {
    localStorage.removeItem('ordersHistory');
    this.ordersSubject.next([]);
  }
}


clearOrdersStorage() {
  if (this.isBrowser()) {
    localStorage.removeItem('ordersHistory');
    this.ordersSubject.next([]);
  }
}
  // ===============================
  // 🔧 Internal Helper Methods
  // ===============================

  // تحديث الحالة والتخزين المحلي
  private updateCartState() {
    this.cartCountSubject.next(this.items.length);
    this.saveCartToStorage();
  }

  // حفظ في localStorage
  private saveCartToStorage() {
    if (this.isBrowser()) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    }
  }

  // استرجاع من localStorage
  private loadCartFromStorage() {
    if (this.isBrowser()) {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      this.items = saved ? JSON.parse(saved) : [];
      this.cartCountSubject.next(this.items.length);
    }
  }

  // ✅ حذف البيانات من localStorage بالكامل
  private removeCartFromStorage() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  // ✅ التأكد إن الكود شغال داخل المتصفح
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
