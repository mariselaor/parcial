import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { AddUpdateProductComponent } from './components/add-update-product/add-update-product.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';

=======
import { AppUserModalComponent } from 'src/app/shared/components/app-user-modal/app-user-modal.component';
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1



@NgModule({
<<<<<<< HEAD
  declarations: [
    HeaderComponent,
    CustomInputComponent,
    LogoComponent,
    AddUpdateProductComponent,
    CustomSelectComponent,
  ],
  exports: [
    HeaderComponent,
    CustomInputComponent,
    ReactiveFormsModule,
    LogoComponent,
    AddUpdateProductComponent,
    CustomSelectComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
=======
    declarations: [
      HeaderComponent,
      CustomInputComponent,
      LogoComponent,
      AppUserModalComponent // Agregar el componente aquí
    ],
    exports: [
      HeaderComponent,
      CustomInputComponent,
      LogoComponent,
      AppUserModalComponent, // Agregar el componente aquí también
      ReactiveFormsModule,
    ],
    imports: [
      CommonModule,
      IonicModule,
      ReactiveFormsModule,
      FormsModule
    ]
  })
  export class SharedModule { }
  


>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
