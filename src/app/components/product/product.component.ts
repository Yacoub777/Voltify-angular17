import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../interface/Iproduct';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { VoltifyService } from '../../service/voltify.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CardComponent, CommonModule ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  allProducts: Iproduct[] = [];
  displayedProducts: Iproduct[] = [];

  selectedCategory: string = '';
  searchText: string = '';

  constructor(
    private productService: VoltifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const searchQuery = params['search'];
      this.searchText = searchQuery ? searchQuery.toLowerCase() : '';
      
      this.fetchProductsAndFilter();
    });
  }

  fetchProductsAndFilter() {
    this.productService.getProducts().subscribe((data) => {
      this.allProducts = data;
      this.applyClientFilter();
    });
  }

  onCategoryChange(value: string) {
    this.selectedCategory = value;
    this.applyClientFilter();
  }

  private applyClientFilter() {
    let result = [...this.allProducts];

    if (this.selectedCategory) {
      result = result.filter(
        (p) => p.category.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    if (this.searchText) {
      const lowerSearch = this.searchText.toLowerCase();

      result = result.filter((p) => {
        const titleMatch = p.title?.toLowerCase().includes(lowerSearch);
        return titleMatch;
      });
    }

    this.displayedProducts = result;
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.allProducts = this.allProducts.filter((p) => p.id !== id);
        this.applyClientFilter();
      },
      error: (err) => console.error('Delete error:', err)
    });
  }
}
