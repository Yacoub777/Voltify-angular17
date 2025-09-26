import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() search = new EventEmitter<{ text: string; category: string }>();

  searchText = '';
  selectedCategory = '';

  onSearchClick() {
    this.search.emit({
      text: this.searchText,
      category: this.selectedCategory,
    });
}
}