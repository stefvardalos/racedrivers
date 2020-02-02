import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {zip} from 'rxjs/internal/observable/zip';
import {map, tap} from 'rxjs/operators';
import {DriverService} from './driver.service';
import {combineLatest} from 'rxjs';
import * as faicons from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  providers: [DriverService]
})
export class DriverComponent implements OnInit {

  public driversData;
  public availableSeasons;
  public selectedSeason;
  private driverID;
  public icons;

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
  ) {
    this.icons = faicons;
  }

  ngOnInit() {

    this.driversData = combineLatest( this.driverService.driver , this.driverService.results )
      .pipe(
        map( (data: any[]) => {
          data[0].team = data[1][data[1].length - 1].constructorName;
          return {
            driver : data[0] ,
            results : data[1]
          };
        })
      );

    this.availableSeasons = this.driverService.availableseasons.pipe(
      tap( (data) => {
        if (!this.selectedSeason) {
          this.selectedSeason = data[0].season;
        }
      })
    );

    zip(this.route.params, this.route.queryParams)
      .pipe(map(results => ( Object.assign({} , results[0] , results[1]))))
      .subscribe(results => {
        this.driverID = results.id;
        this.selectedSeason = results.season;

        this.driverService.fetchDriverDetails(results.id);
        this.driverService.fetchDriverResults(results.id , results.season);
        this.driverService.fetchDriverSeasons(results.id);
      });

  }

  fetchSeasonResults( season: string ) {
    this.driverService.fetchDriverResults( this.driverID, season);
  }

}
