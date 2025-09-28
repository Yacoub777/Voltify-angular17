import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartCount = 0;
  searchText = '';
  alertMessage = '';
  showAlert = false;

  constructor(private cartService: CartService, private router: Router) {}

  onSearchClick() {
    if (this.searchText.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchText.trim() }
      });
    }
  }

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.cartService.alert$.subscribe(msg => {
      this.alertMessage = msg;
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 2000);
    });
  }
}
