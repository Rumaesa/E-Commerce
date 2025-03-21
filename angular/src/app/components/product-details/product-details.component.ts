import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  product!: Product;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe( () => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
   const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
   this.productService.getProduct(theProductId).subscribe(
    data => {
      this.product = data;
    }
   )
  }

  addToCart() {
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
