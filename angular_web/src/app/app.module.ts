import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { StarsComponent } from './stars/stars.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CollapseModule, CarouselModule, RatingModule, ModalModule } from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {ProductService} from "./tools/service/product.service";
import { FilterPipe } from './tools/pipe/filter.pipe';
import {HttpModule} from "@angular/http";
import { HelloWorldComponent } from './hello-world/hello-world.component';

const routeConfig: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product/:productId', component: ProductDetailComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    StarsComponent,
    CarouselComponent,
    NavComponent,
    FooterComponent,
    SearchComponent,
    ProductDetailComponent,
    HomeComponent,
    FilterPipe,
    HelloWorldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(routeConfig),
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
