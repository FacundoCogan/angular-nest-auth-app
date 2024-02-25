import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
const uri = "mongodb+srv://AuthDB:wzle5TM4Lv9ziwDr@cluster0.uae8myh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
