import { Component, OnDestroy, Input} from '@angular/core';
import { SliderComponent } from './slide.component';
export enum Direction {UNKNOWN, NEXT, PREV}

@Component({
    selector: 'app-carousel',
    template: `
    <div class="carousel slide">
      <ol class="carousel-indicators" [hidden]="slides.length <= 1">
         <li *ngFor="let slidez of slides" [class.active]="slidez.active === true" (click)="select(slidez)"></li>
      </ol>
      <ol class="carousel-indicators myTab">
        <li *ngFor="let slidez of slides" [class.active]="slidez.active === true"></li>
      </ol>
      <div class="carousel-inner"><ng-content></ng-content></div>
          <a class="left carousel-control" (click)="prev()" [hidden]="!slides.length">
          <span class="glyphicon glyphicon-chevron-left"></span>
          </a>
          <a class="right carousel-control" (click)="next()" [hidden]="!slides.length">
          <span class="glyphicon glyphicon-chevron-right"></span>
          </a>
    </div>
  `
})

export class CarouselComponent {
  private slides: Array<SliderComponent> = [];
  private currentInterval: any;
  private isPlaying: boolean;
  private destroyed = false;
  private currentSlide: SliderComponent;
  private _interval: number;

  @Input() public noWrap: boolean;
  @Input() public noTransition: boolean;

  @Input() public get interval(): number {
    return this._interval;
  }

// Setting the time interval for the slides to change

  public set interval(value: number) {
    this._interval = value;
    this.restartTimer();
  }

  public getInstance() {
    return this;
  }

public select(nextSlide: SliderComponent, direction: Direction = Direction.UNKNOWN) {
    const nextIndex = nextSlide.index;
    if (direction === Direction.UNKNOWN) {
      direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
    }

    // Prevent this user-triggered transition from occurring if there is already one in progress
    if (nextSlide && nextSlide !== this.currentSlide) {
      this.goNext(nextSlide, direction);
    }
  }

  private goNext(slide: SliderComponent, direction: Direction) {
    if (this.destroyed) {
      return;
    }

    slide.direction = direction;
    slide.active = true;

    if (this.currentSlide) {
      this.currentSlide.direction = direction;
      this.currentSlide.active = false;
    }

    this.currentSlide = slide;

   // every time you change slides, reset the timer
    this.restartTimer();
  }

  // Getting the slide based on a particular index value.

  private getSlideByIndex(index: number) {
    const len = this.slides.length;
    for (let i = 0; i < len; ++i) {
      if (this.slides[i].index === index) {
        return this.slides[i];
      }
    }
  }

  // Getting the current index of the slides

  private getCurrentIndex() {
    return !this.currentSlide ? 0 : this.currentSlide.index;
  }

  // Changing to the next slide

  private next() {
    const newIndex = (this.getCurrentIndex() + 1) % this.slides.length;

    if (newIndex === 0 && this.noWrap) {
      return;
    }

    return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
  }

  // Changing to the previous slide

  private prev() {
    const newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;

    if (this.noWrap && newIndex === this.slides.length - 1) {
      return;
    }

    return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
  }

  // Clearing the timer

  private restartTimer() {
    this.resetTimer();
    const interval = +this.interval;
    if (!isNaN(interval) && interval > 0) {
      this.currentInterval = setInterval(() => {
        const nInterval = +this.interval;
        if (this.isPlaying && !isNaN(this.interval) && nInterval > 0 && this.slides.length) {
          this.next();
        }
      }, interval);
    }
  }

  // Resetting the timer

  private resetTimer() {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
  }

  public play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.restartTimer();
    }
  }

  // Adding all the carousel images and getting the index.

  public addSlide(slide: SliderComponent) {
    slide.index = this.slides.length;
    this.slides.push(slide);
    if (this.slides.length === 1 || slide.active) {
      this.select(this.slides[this.slides.length - 1]);
      if (this.slides.length === 1) {
        this.play();
      }
    } else {
      slide.active = false;
    }
  }
}

