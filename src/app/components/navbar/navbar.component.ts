import { Component, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  alertType: 'success' | 'danger' = 'success';
  hoverLogin: boolean = false;
  isLightMode = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.cartService.alert$.subscribe(alertData => {
      this.alertMessage = alertData.message;
      this.alertType = alertData.type === 'warning' ? 'danger' : 'success';
      this.showAlert = true;
      const timeout = alertData.type === 'warning' ? 4000 : 2000;
      setTimeout(() => (this.showAlert = false), timeout);
    });

    // ✅ تأكد إنك في المتصفح قبل استخدام localStorage أو document
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        this.enableLightMode();
      } else {
        this.enableDarkMode();
      }
    }
  }

  onSearchClick() {
    const trimmed = this.searchText.trim();
    this.router.navigate(['/products'], {
      queryParams: trimmed ? { search: trimmed } : {},
    });
  }

  toggleTheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.isLightMode = !this.isLightMode;
    if (this.isLightMode) {
      this.enableLightMode();
    } else {
      this.enableDarkMode();
    }
  }

  enableDarkMode() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.renderer.addClass(document.body, 'dark-theme');
    this.renderer.removeClass(document.body, 'light-theme');
    localStorage.setItem('theme', 'dark');
    this.isLightMode = false;
  }

  enableLightMode() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.renderer.addClass(document.body, 'light-theme');
    this.renderer.removeClass(document.body, 'dark-theme');
    localStorage.setItem('theme', 'light');
    this.isLightMode = true;
  }
}
