import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './carousel/carousel.component.html'
})
export class AppComponent  {
    // Time interval for the next slide
    private NextPhotoInterval = 5000;
    // Looping is enabled or not
    private noLoopSlides = false;
    // Array of slides (pictures)
    private slides: Array<any> = [];

    constructor() {
        this.addNewSlide();
    }

    private addNewSlide() {
         this.slides.push(
            {image: '../assets/images/home1.jpg'},
            {image: '../assets/images/home2.jpg'},
            {image: '../assets/images/home3.jpg'},
            {image: '../assets/images/home4.jpg'},
            {image: '../assets/images/home5.jpg'},
        );
    }
}
