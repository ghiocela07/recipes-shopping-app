import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../angular-material.module';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';


@NgModule({
    declarations: [
        DropdownDirective,
        LoadingSpinnerComponent,
        AlertComponent
    ],
    imports: [
        AngularMaterialModule,
        CommonModule,
        FlexLayoutModule,
        LayoutModule
    ],
    exports: [
        DropdownDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        AngularMaterialModule,
        CommonModule,
        FlexLayoutModule,
        LayoutModule
    ]
})
export class SharedModule {

}
