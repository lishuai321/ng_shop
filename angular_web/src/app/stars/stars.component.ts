import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  public max = 5;
  @Input('rating') rating: number;
  @Output('ratingChange')
  ratingChange: EventEmitter<number> = new EventEmitter();


  @Input()
  isReadonly = true;

  constructor() {

  }

  ngOnInit() {
  }

  onClick() {
    this.ratingChange.emit(this.rating);
  }

}
