import { Component, Input, OnInit } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Iproduct } from '../../interface/Iproduct';
import { VoltifyService } from '../../service/voltify.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @Input() searchText = '';
  @Input() selectedCategory = '';

  products: Iproduct[] = [];

  constructor(private productService: VoltifyService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => (this.products = res),
      error: (err) => console.error(err)
    });
  }
}
