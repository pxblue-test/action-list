import './polyfills';
<<<<<<< HEAD

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  // Ensure Angular destroys itself on hot reloads.
=======
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
>>>>>>> 3cdee2219e4b9a40626ba9c29d3f6e5e50142f70
  if (window['ngRef']) {
    window['ngRef'].destroy();
  }
  window['ngRef'] = ref;
<<<<<<< HEAD

  // Otherise, log the boot error
}).catch(err => console.error(err));
=======
}).catch(err => console.error(err));
>>>>>>> 3cdee2219e4b9a40626ba9c29d3f6e5e50142f70
