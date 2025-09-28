import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VoltifyService } from '../../service/voltify.service';
import { Iproduct } from '../../interface/Iproduct';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  isEdit: boolean = false;
  productId?: string;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: VoltifyService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  initializeForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  checkEditMode() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('🔍 Route ID:', id);
      
      if (id) {
        this.isEdit = true;
        this.productId = id;
        console.log('🎯 Edit Mode - Product ID:', this.productId);
        this.loadProductData(this.productId);
      } else {
        this.isEdit = false;
        this.productId = undefined;
        console.log('➕ Add Mode');
      }
    });
  }

  loadProductData(id: string) {
    this.isLoading = true;
    console.log('🔄 Loading product with ID:', id);
    
    this.service.getProductById(id).subscribe({
      next: (product) => {
        console.log('✅ Product loaded:', product);
        if (product) {
          this.form.patchValue({
            title: product.title || '',
            price: product.price || 0,
            quantity: product.quantity || 0,
            category: product.category || '',
            image: product.image || ''
          });
          console.log('📝 Form patched with values');
        } else {
          console.warn('⚠️ Product not found');
          alert('Product not found!');
          this.router.navigate(['/']);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error loading product:', err);
        alert('Error loading product data! Check if JSON Server is running.');
        this.isLoading = false;
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.markAllFieldsAsTouched();
      alert('Please fill all required fields correctly!');
      return;
    }

    console.log('🚀 Form submitted - Edit Mode:', this.isEdit);

    if (this.isEdit && this.productId) {
      // EDIT MODE
      const productData = { 
        ...this.form.value, 
        id: this.productId
      };
      
      console.log('📤 Sending update data:', productData);

      this.service.updateProduct(this.productId, productData).subscribe({
        next: (updatedProduct) => {
          console.log('✅ Product updated successfully:', updatedProduct);
          alert('Product updated successfully!');
          this.router.navigate(['/']); 
        },
        error: (err) => {
          console.error('❌ Update error:', err);
          alert('Error updating product! Check console for details.');
        }
      });
    } else {
      // ADD MODE - مع توليد ID متسلسل
      this.generateSequentialId().subscribe(newId => {
        const productData = { 
          ...this.form.value, 
          id: newId
        };

        console.log('📤 Sending new product data:', productData);

        this.service.addProduct(productData).subscribe({
          next: (newProduct) => {
            console.log('✅ Product added successfully:', newProduct);
            alert('Product added successfully!');
            this.router.navigate(['/']); 
          },
          error: (err) => {
            console.error('❌ Add error:', err);
            alert('Error adding product! Check console for details.');
          }
        });
      });
    }
  }

  generateSequentialId() {
    return this.service.getProducts().pipe(
      map(products => {
        // نجيب كل الـ IDs ونحولهم لأرقام
        const ids = products.map(p => {
          const id = p.id.toString();
          return isNaN(Number(id)) ? 0 : Number(id);
        });
        
        // نجيب أعلى رقم
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        // نرجع رقم جديد كـ string
        return (maxId + 1).toString();
      })
    );
  }

  markAllFieldsAsTouched() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }
}