import { Component, Input } from '@angular/core';
import { Iproduct } from '../../interface/Iproduct';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardComponent,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  
  @Input() products: Iproduct[] = [];
  @Input() searchText: string = '';
  @Input() selectedCategory: string = '';

  get filteredProducts() {
    let result = this.products;

    if (this.selectedCategory) {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchText) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    return result;
  }
}
