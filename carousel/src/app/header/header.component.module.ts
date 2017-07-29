import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';


@NgModule({
    imports: [ HeaderModule ],
    declarations: [HeaderComponent],
    exports: [HeaderComponent]
})

export class HeaderModule {

}
