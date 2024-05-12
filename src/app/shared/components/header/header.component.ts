import { Component, Input, OnInit, inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
<<<<<<< HEAD

=======
  
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  @Input() showMenu!: boolean;

  utilsSvc = inject(UtilsService);

  ngOnInit() {}

<<<<<<< HEAD
  dismissModal(){
    this.utilsSvc.dissmisModal();
=======
  dismissModal() {
    this.utilsSvc.dismissModal();
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
  }

}
