import { Routes } from '@angular/router';
import { ChawtayComponent } from './chawtay/chawtay.component'; // သင့် Component လမ်းကြောင်း
import { SorryComponent } from './sorry/sorry.component';

export const routes: Routes = [
  {
   
    path: 'gift/:id',
    component: ChawtayComponent
  },
  {
   
    path: '',
    component:SorryComponent
  },
  {
    // မှားယွင်းသော URL များအတွက် Default သို့ ပြန်ပို့ရန်
    path: '**',
    redirectTo: 'sorry'
  }
];