import { Component, OnInit } from '@angular/core';
import {DriversService} from './drivers.service';

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

  public driversColumns = [
    {value: 'position' , display: 'Index' , type: 'number'},
    {value: 'fullName' , display: 'Drivers Name' , type: 'text'},
    {value: 'constructorName' , display: 'Constructors Name' , type: 'text'},
    {value: 'wins' , display: 'Wins' , type: 'number'},
    {value: 'points' , display: 'Points' , type: 'number'}
  ]

  constructor(

    private driversService: DriversService,
  ) { }

  ngOnInit() {
    this.fetchDrivers();
    this.driversService.fetchAvailableSeasons();

    this.driversData = this.driversService.drivers;
    this.seasons = this.driversService.seasons;

  }

  fetchDrivers(season?) {
    this.driversService.fetchDrivers(season);
  }

}
