import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from "../tools/service/product.service";
import { FormControl } from "@angular/forms";
import "rxjs/Rx";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // 异步管道使用时的数据定义
  /*products: Observable<Array<Product>>;*/

  products: Array<Product>;
  // 或者 products: Product[];

  public keyword: string;

  public keywordFilter: FormControl = new FormControl();

  constructor(private productService: ProductService) {
    this.keywordFilter.valueChanges.debounceTime(500).subscribe(
      value => this.keyword = value
    );
  }

  ngOnInit() {
      this.productService.getProducts().subscribe(
        products => this.products = products
      );

      // 异步管道的数据获取
      /*this.productService.subject.asObservable().subscribe(
        params => this.products = this.productService.serch(params)
      );*/


      // 回调方式
      // this.productService.subject.asObservable().subscribe(
      // params => this.productService.serch(params).subscribe(
      //   product => this.products = product
      //   )
      // );

      // Rxjs组合操作符方式
      this.productService.subject.asObservable().concatMap(params => {
        return this.productService.serch(params);
      }).subscribe(
        products => this.products = products
      );
  }

}
