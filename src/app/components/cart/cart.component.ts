import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  onQuantityChange(item: any, newQty: number) {
    if (newQty > item.quantity) {
      item.selectedQty = item.quantity;
      alert(`The mmax Quantity of product is :${item.quantity}`);
    } else if (newQty < 1) {
      item.selectedQty = 1;
    } else {
      item.selectedQty = newQty;
    }
  }

  onDelete(item: any) {
    this.cartService.removeFromCart(item.id);
    this.cartItems = this.cartItems.filter(p => p.id !== item.id);
  }

  getTotalPrice(item: any) {
    return (item.price * item.selectedQty).toFixed(2);
  }

  getCartTotal() {
  return this.cartItems
    .reduce((sum, item) => sum + item.price * item.selectedQty, 0)
    .toFixed(2);
}

}
