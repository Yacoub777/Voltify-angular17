import { Component, Input } from '@angular/core';
import { Iproduct } from '../../interface/Iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() product !: Iproduct;
}
