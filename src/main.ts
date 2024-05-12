import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

<<<<<<< HEAD
import { defineCustomElements } from '@ionic/pwa-elements/loader';

=======
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
<<<<<<< HEAD

defineCustomElements(window);
=======
>>>>>>> ae0b210b2dd2d32d6efc622b5fcf0a8248d76ed1
