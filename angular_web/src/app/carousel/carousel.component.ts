import { Component, OnInit } from '@angular/core';
import {CarouselConfig} from 'ngx-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [{provide: CarouselConfig, useValue: {interval: 1500, noPause: true}}]
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
