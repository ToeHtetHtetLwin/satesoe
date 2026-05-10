import { Routes } from '@angular/router';
import { ChawtayComponent } from './chawtay/chawtay.component'; // သင့် Component လမ်းကြောင်း

export const routes: Routes = [
  {
    // Customer ID အလိုက် dynamic link ဖြစ်စေရန် :id ကို သုံးထားပါသည်
    path: 'gift/:id',
    component: ChawtayComponent
  },
  {
    // အကယ်၍ ID မပါဘဲ link ကို ဝင်လာပါက Default customer ဆီသို့ ပို့ပေးရန်
    path: '',
    redirectTo: 'gift/toe-htet',
    pathMatch: 'full'
  },
  {
    // မှားယွင်းသော URL များအတွက် Default သို့ ပြန်ပို့ရန်
    path: '**',
    redirectTo: 'gift/toe-htet'
  }
];