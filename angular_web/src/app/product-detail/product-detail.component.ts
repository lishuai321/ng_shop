import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, ProductService, Comment} from "../tools/service/product.service";
import {BsModalService} from "ngx-bootstrap";
import {BsModalRef} from "ngx-bootstrap/modal/modal-options.class";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  public goodsImg: string = "";
  comments: Comment[];
  public modalRef: BsModalRef;
  public commentRating: number = 5;
  public commentText: string;

  constructor(private routeInfo: ActivatedRoute, private productService: ProductService, private modalService: BsModalService) { }

  ngOnInit() {
    const productId: number = this.routeInfo.snapshot.params['productId'];
    this.productService.getProduct(productId).subscribe(
      product => {
        this.product = product;
        this.goodsImg = this.getGoodsImg(this.product.id);
      }
    );
    this.productService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    );
  }

  getGoodsImg(goodsId: number): string {
    switch (goodsId) {
      case 1:
        return 'assets/goods/android-big.jpg';
      case 2:
        return 'assets/goods/c-big.jpg';
      case 3:
        return 'assets/goods/java-big.jpg';
      case 4:
        return 'assets/goods/javaweb-big.jpg';
      case 5:
        return 'assets/goods/python-big.jpg';
      case 6:
        return 'assets/goods/web-big.jpg';
      default :
        return '';
    }
  }

  showComment(template: TemplateRef<any>) {
    this.modalService.onHidden.subscribe(() => {
      this.commentRating = 5;
      this.commentText = "";
    });
    this.modalRef = this.modalService.show(template);
  }

  addComment() {
    const comment = new Comment(0, this.product.id, new Date().toString(), 'Derry', this.commentRating, this.commentText);
    this.comments.unshift(comment);
    this.commentRating = 5;
    this.commentText = "";
    this.modalRef.hide();
    const sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;
  }

}
