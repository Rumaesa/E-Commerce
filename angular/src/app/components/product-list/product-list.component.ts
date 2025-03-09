import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number= 1;
  currentCategoryName: string= "";
  searchMode: boolean = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSeachProducts();
    }else{
      this.handleListProducts();
    }
  }

  handleSeachProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProduct(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts(){

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    // .route: use the activated route
    // .snapshot: state of route at this given moment in time
    // .paramMap: Map of all the route parameters
    // .has('id'): read the id parameter

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the + symbol.
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      // Parameter valu is returned a string, Use the '+' symbol to convert it into the number.
      // '!' -> Non-null assertion operator. tells the compiler that the object is not null. 
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    } else {
      this.currentCategoryId = 1;
      // default value 1.
      this.currentCategoryName = 'Books';
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }


}
