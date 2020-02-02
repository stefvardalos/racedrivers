import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {zip} from "rxjs/internal/observable/zip";
import {map} from "rxjs/operators";
import {DriverService} from "./driver.service";

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  providers: [DriverService]
})
export class DriverComponent implements OnInit {

  public resultsData;
  public driverDetails;

  public driverColumns = [
    {value: 'round' , display: 'Round' , type: 'number'},
    {value: 'raceName' , display: 'Grand Prix' , type: 'text'},
    {value: 'constructorName' , display: 'Team' , type: 'text'},
    {value: 'grid' , display: 'Grid' , type: 'number'},
    {value: 'result' , display: 'Race' , type: 'number'}
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private driverService: DriverService
  ) { }

  ngOnInit() {

    this.resultsData = this.driverService.results;
    this.driverDetails = this.driverService.driver;

    zip(this.route.params, this.route.queryParams)
      .pipe(map(results => ( Object.assign({} , results[0] , results[1]))))
      .subscribe(results => {

        this.driverService.fetchDriverDetails(results.id);
        this.driverService.fetchDriverResults(results.id , results.season);
      });

  }

}
