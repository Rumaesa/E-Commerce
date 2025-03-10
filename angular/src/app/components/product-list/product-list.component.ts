import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number= 1;
  previousCategoryId: number = 1;
  currentCategoryName: string= "";
  previousKeyWord: string = "";
  searchMode: boolean = false;

  // pagination properties:
  thePageNumber:number = 1;
  thePageSize: number = 5;
  theTotalElement: number = 0;

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
    
    // if we have a different keyword than previous, then set thePageNumber to 1.
    if(this.previousKeyWord != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyWord = theKeyword;


    this.productService.searchProductPaginate(this.thePageNumber - 1,
                                              this.thePageSize,
                                              theKeyword).subscribe(this.processResult());
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

    // check if we have a different category id than previous.
    // Note: Angular will reuse a component if it is currently being viewed.

    // if we have a different category id than previous, then set thePageNumber back to 1.
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber= 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               this.currentCategoryId).subscribe(
                                                this.processResult()
                                               );
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult(){
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElement = data.page.totalElements;
    }
  }

}
