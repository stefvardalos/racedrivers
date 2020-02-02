import { Component, OnInit } from '@angular/core';
import {DriversService} from './drivers.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as faicons from '@fortawesome/free-solid-svg-icons';
import {HelperService} from "../common/helper.service";

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
  public selectedSeason = '2019';
  public icons;

  public driversColumns = [
    {value: 'position' , display: 'Index' , type: 'number'},
    {value: 'fullName' , display: 'Drivers Name' , type: 'text'},
    {value: 'constructorName' , display: 'Constructors Name' , type: 'text'},
    {value: 'wins' , display: 'Wins' , type: 'number'},
    {value: 'points' , display: 'Points' , type: 'number'}
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private driversService: DriversService,
    private helperService: HelperService,
  ) {
    this.icons = faicons;
  }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        this.fetchDrivers(params.season);
        if (params && params.hasOwnProperty('season')) {
          this.selectedSeason = params.season;
        }
      });

    this.driversService.fetchAvailableSeasons();

    this.driversData = this.driversService.drivers;
    this.seasons = this.driversService.seasons;

  }

  fetchDrivers(season?) {
    this.driversService.fetchDrivers(season);
  }

  selectDriver(driverData: any) {
    if (this.selectedSeason === '2020') {
      this.helperService.shotNotification('This year hasnt started yet!' , 1);
    } else {
      this.router.navigate(['driver', driverData.Driver.driverId ], { queryParams : {season: this.selectedSeason } });
    }
  }

}
