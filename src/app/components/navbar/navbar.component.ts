import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() search = new EventEmitter<{ text: string; category: string }>();
  cartCount = 0;
  searchText = '';
  selectedCategory = '';
  alertMessage = '';
  showAlert = false;

  constructor(private cartService: CartService) { }

  onSearchClick() {
    this.search.emit({
      text: this.searchText,
      category: this.selectedCategory,
    });
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

