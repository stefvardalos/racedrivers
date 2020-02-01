import { Component, OnInit } from '@angular/core';
import {DriversService} from './drivers.service';
import {skip, map} from "rxjs/operators";

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  providers: [DriversService],
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  public driversData: any;
  public driverNameSearch: string;

  public seasons: any;
  public selectedSeason;

  public tableSort = {
    attribute : 'index' ,
    order : true
  };

  constructor(

    private driversService: DriversService,
  ) { }

  ngOnInit() {
    this.fetchDrivers();
    this.driversService.fetchAvailableSeasons();

    this.driversData = this.driversService.drivers;
    this.seasons = this.driversService.seasons;

  }

  changeSorting(attribute) {
    if (this.tableSort.attribute === attribute) {
      this.tableSort.order = !this.tableSort.order;
    } else {
      this.tableSort.attribute = attribute;
      this.tableSort.order = true;
    }
    this.tableSort = Object.assign({} , this.tableSort);
  }

  fetchDrivers(season?) {
    this.driversService.fetchDrivers(season);
  }

}
