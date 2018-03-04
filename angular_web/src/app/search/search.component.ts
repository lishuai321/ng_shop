import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {positiveNumberValidator} from "../tools/validator/validators";
import {ProductService} from "../tools/service/product.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formModel: FormGroup;

  categories: string[];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.formModel = fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, positiveNumberValidator()],
      category: ['0']
    });
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategory();
  }

  onSearchSubmit() {
    if (this.formModel.valid) {
      console.log(this.formModel.value);
      this.productService.subject.next(this.formModel.value);
    }
  }

}
