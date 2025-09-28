import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Iproduct } from '../../interface/Iproduct';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() product!: Iproduct;
  @Output() delete = new EventEmitter<string>(); 

  onDeleteClick() {
    this.delete.emit(this.product.id); 
  }
}
