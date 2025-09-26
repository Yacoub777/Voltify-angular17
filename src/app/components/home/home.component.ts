import { Component, Input } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { Iproduct } from '../../interface/Iproduct';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @Input() searchText = '';
  @Input() selectedCategory = '';

  products: Iproduct[] = [
    // Phones
    {
      image: 'assets/images/iPhone.jpg',
      title: 'iPhone 13 Pro',
      quantity: 5,
      price: 1000,
      category: 'phones'
    },
    {
      image: 'assets/images/samsung-phone.jpg',
      title: 'Samsung Galaxy S21',
      quantity: 4,
      price: 900,
      category: 'phones'
    },
    {
      image: 'assets/images/xiaomi.jpg',
      title: 'Xiaomi Redmi Note 11',
      quantity: 7,
      price: 350,
      category: 'phones'
    },
  
    // Laptops
    {
      image: 'assets/images/macbook.jpg',
      title: 'MacBook Pro M1',
      quantity: 3,
      price: 2000,
      category: 'laptops'
    },
    {
      image: 'assets/images/dell.jpg',
      title: 'Dell XPS 13',
      quantity: 6,
      price: 1500,
      category: 'laptops'
    },
    {
      image: 'assets/images/hp.jpg',
      title: 'HP Spectre x360',
      quantity: 2,
      price: 1400,
      category: 'laptops'
    },
  
    // Audio
    {
      image: 'assets/images/airpods1.jpg',
      title: 'Apple AirPods Pro',
      quantity: 0,
      price: 300,
      category: 'audio'
    },
    {
      image: 'assets/images/SonyHeadphones.jpg',
      title: 'Sony WH-1000XM4',
      quantity: 5,
      price: 400,
      category: 'audio'
    },
    {
      image: 'assets/images/jbl.jpg',
      title: 'JBL Flip 6 Speaker',
      quantity: 3,
      price: 150,
      category: 'audio'
    }
  ];
  
}
