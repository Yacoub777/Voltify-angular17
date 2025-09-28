import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Iproduct } from '../../interface/Iproduct';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { VoltifyService } from '../../service/voltify.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnChanges {
  @Input() products: Iproduct[] = [];
  @Input() searchText: string = '';
  @Input() selectedCategory: string = '';

  displayedProducts: Iproduct[] = [];

  constructor(private productService: VoltifyService) {}

  ngOnInit() {
    this.displayedProducts = [...this.products];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && changes['products'].currentValue) {
      this.displayedProducts = [...this.products];
      this.applyClientFilter();
    }

    if (changes['searchText'] || changes['selectedCategory']) {
      this.applyClientFilter();
    }
  }

  onSearch(value: string) {
    this.searchText = value;
    this.applyClientFilter();
  }

  onCategoryChange(value: string) {
    this.selectedCategory = value;
    this.applyClientFilter();
  }

  private applyClientFilter() {
    let result = [...this.products];

    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchText) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    this.displayedProducts = result;
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        this.applyClientFilter(); 
      },
      error: (err) => console.error('Delete error:', err)
    });
  }
}
