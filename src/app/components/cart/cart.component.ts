import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice = 0;
  showPaymentSection: boolean = false;
  selectedPayment: string = '';
  orders: any[] = [];
  showOrdersSection: boolean = false;
  //alerts
  alertMessage = '';
  alertType: 'success' | 'warning' | '' = '';
  showAlert = false;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.updateTotal();
    // ⬅️ Subscribe على الـ orders BehaviorSubject
  this.cartService.orders$.subscribe(orders => {
    this.orders = orders;
    this.showOrdersSection = this.orders.length > 0;
  });
  }

  // ✅ تحديث الإجمالي
  updateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.selectedQty,
      0
    );
  }

  // ✅ عند تغيير الكمية
  onQuantityChange(item: any, newQty: number) {
    if (newQty > item.quantity) {
      item.selectedQty = item.quantity;
      alert(`The Max Quantity of Product is: ${item.quantity}`);
    } else if (newQty < 1) {
      item.selectedQty = 1;
    } else {
      item.selectedQty = newQty;
    }
    this.updateTotal();
  }

  // ✅ حذف عنصر من السلة
  onDelete(item: any) {
    this.cartService.removeFromCart(item.id);
    this.cartItems = this.cartItems.filter(p => p.id !== item.id);
    this.updateTotal();
  }

  // ✅ إجمالي سعر العنصر
  getTotalPrice(item: any) {
    return (item.price * item.selectedQty).toFixed(2);
  }

  // ✅ إجمالي السلة بالكامل
  getCartTotal() {
    return this.totalPrice.toFixed(2);
  }

  // ✅ زر فتح الدفع
  onCheckoutClick() {
    this.showPaymentSection = !this.showPaymentSection;
  }

  // ✅ عند إتمام الدفع
  completePayment() {
    // ✅ التأكد من اختيار وسيلة الدفع
    if (!this.selectedPayment) {
      this.alertMessage = '⚠️ Please select a payment method before proceeding!';
      this.alertType = 'warning';
      this.showAlert = true;
      setTimeout(() => (this.showAlert = false), 3000);
      return; // يمنع تنفيذ باقي الدالة
    }
  
    const order = {
      date: new Date().toLocaleString(),
      items: this.cartItems,
      total: this.totalPrice,
    };
  
    // ✅ نحفظ الطلب مع وسيلة الدفع
    this.cartService.saveOrder(order, this.selectedPayment);
  
    // ✅ بعد الحفظ نمسح السلة
    this.cartService.clearCart();
    this.cartItems = [];
    this.totalPrice = 0;
    this.showPaymentSection = false;
  
    // ✅ عرض تنبيه بالنجاح
    this.alertMessage = `✅ Payment successful via ${this.selectedPayment}. Your order has been placed!`;
    this.alertType = 'success';
    this.showAlert = true;
    setTimeout(() => (this.showAlert = false), 3000);
  }
  
  

  selectPayment(method: string) {
    this.selectedPayment = method;
  }


  onClearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    alert('🗑️ Cart cleared successfully!');
  }

  clearOrders() {
    this.cartService.clearOrdersStorage();
    this.orders = [];
    this.showOrdersSection = false;
    this.alertMessage = '🗑️ All orders have been cleared.';
    this.alertType = 'warning';
    this.showAlert = true;
  }
  
}