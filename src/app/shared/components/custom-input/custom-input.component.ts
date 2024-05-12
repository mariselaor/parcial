import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent  implements OnInit {

  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;
<<<<<<< HEAD
  
=======

>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
  isPassword!: boolean;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
<<<<<<< HEAD
    if (this.type === 'password') this.isPassword = true;
  }

  showOrHidePassword(){
=======
    if (this.type == 'password') this.isPassword = true;
  }

  showOrHidePassword() {

>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
    this.hide = !this.hide;

    if (this.hide) this.type = 'password';
    else this.type = 'text';
  }

}
