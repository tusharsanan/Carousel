import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';

import { AppComponent } from 'app/app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SliderComponent } from './carousel/slide.component';

import { HeaderComponent } from 'app/header/header.component';
import { PlanAndBookComponent } from 'app/planAndBook/planAndBook.component';


@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, CarouselComponent, SliderComponent, HeaderComponent, PlanAndBookComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ NgModel ]
})

export class AppModule { }
