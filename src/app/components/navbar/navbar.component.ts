import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartCount = 0;
  searchText = '';
  alertMessage = '';
  showAlert = false;
  alertType: 'success' | 'danger' = 'success'; // 👈 لتحديد لون التنبيه
  hoverLogin: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  onSearchClick() {
    const trimmed = this.searchText.trim();
    this.router.navigate(['/products'], {
      queryParams: trimmed ? { search: trimmed } : {},
    });
  }

  ngOnInit() {
    // تحديث عدد المنتجات في الكارت
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // استقبال التنبيهات من السيرفيس
    this.cartService.alert$.subscribe(alertData => {
      this.alertMessage = alertData.message;
      this.alertType = alertData.type === 'warning' ? 'danger' : 'success';
      this.showAlert = true;

      // تحديد زمن الظهور بناءً على نوع الرسالة
      const timeout = alertData.type === 'warning' ? 4000 : 2000;
      setTimeout(() => this.showAlert = false, timeout);
    });
  }
}
