import { TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from './carousel.component';

describe('Component: CarouselComponent', () => {
    let component: CarouselComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CarouselComponent],
        });

        const fixture = TestBed.createComponent(CarouselComponent);
        component = fixture.componentInstance;
    });
    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });
});