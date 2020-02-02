import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DriversComponent } from './drivers/drivers.component';
import { DriverComponent } from './driver/driver.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {HttpClientModule} from '@angular/common/http';
import { DriverNamePipe } from './common/driver-name.pipe';
import {FormsModule} from '@angular/forms';
import { SortTablePipe } from './common/sort-table.pipe';
import { TableviewComponent } from './common/tableview/tableview.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DriversComponent,
    DriverComponent,
    PagenotfoundComponent,
    DriverNamePipe,
    SortTablePipe,
    TableviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
