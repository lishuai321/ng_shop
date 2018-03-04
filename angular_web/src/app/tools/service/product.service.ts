import {EventEmitter, Injectable} from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
/*import "rxjs/Rx"; // 单独使用map操作符需要引入*/

@Injectable()
export class ProductService {
  headers = new Headers({'Content-Type': 'application/json'});

  // myemitter: EventEmitter<SearchParams> = new EventEmitter();
  public subject = new Subject<SearchParams>();

  constructor(private http: Http) { }

  getProducts(): Observable<Product[]> {
    return this.http.get("/mall/products").map(res => res.json());
  }

  getProduct(id: number): Observable<Product> {
    return this.http.post("/mall/getProductById", JSON.stringify({id: id}), {headers: this.headers}).map(res => res.json());
  }

  getCommentsForProductId(id: number): Observable<Comment[]> {
    return this.http.get("/mall/getCommentsByProductId/" + id).map(res => res.json());
  }

  getAllCategory(): string[] {
    return ['安卓', 'JAVA', 'WEB', 'Python', '高级', '实战'];
  }

  serch(params: SearchParams): Observable<Product[]> {
    return this.http.post("/mall/products", JSON.stringify(params), {headers: this.headers}).map(res => res.json());
  }
}

export class SearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) {}
}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public img: string,
    public categories: Array<string>
  ) {}
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) {}
}
