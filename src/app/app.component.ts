import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent,HomeComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Voltify';
  searchText = '';
  selectedCategory = '';

  onSearch(event: { text: string; category: string }) {
    this.searchText = event.text;
    this.selectedCategory = event.category;
  }
}
