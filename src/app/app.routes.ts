import { Routes } from '@angular/router';
import { ChawtayComponent } from './chawtay/chawtay.component';
import { SorryComponent } from './sorry/sorry.component';

export const routes: Routes = [
  {
    path: 'gift/:id',
    component: ChawtayComponent
  },
  {
    path: '', // Default path မှာ SorryComponent ကိုပြမယ်
    component: SorryComponent
  },
  {
    path: '**',
    redirectTo: '' // တခြားမှားယွင်းတဲ့ path တွေလာရင် empty path ကို ပို့မယ်
  }
];