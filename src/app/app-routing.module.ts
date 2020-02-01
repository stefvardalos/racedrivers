import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DriversComponent} from './drivers/drivers.component';
import {DriverComponent} from './driver/driver.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DriversComponent,
    data: {
      animation: {
        value: 'dashboard'
      }
    }
  },
  {
    path: 'driver/:id',
    component: DriverComponent,
    data: {
      animation: {
        value: 'driver'
      }
    }
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    data: {
      animation: {
        value: 'home'
      }
    }
  },
  {
    path: '**',
    component: PagenotfoundComponent,
    data: {
      animation: {
        value: 'notfound'
      }
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
