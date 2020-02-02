import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HelperService} from '../common/helper.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {


  private _driver: Subject<any>;
  public readonly driver: Observable<any>;

  private _results: Subject<any>;
  public readonly  results: Observable<any>;

  private _availableseasons: Subject<any>;
  public readonly  availableseasons: Observable<any>;

  private dataStore = {
    seasons : {} ,
    availableseasons : []
  };

  constructor(
    private helperService: HelperService
  ) {

    this._driver = new Subject<any>();
    this.driver = this._driver.asObservable();
    this._results = new Subject<any>();
    this.results = this._results.asObservable();
    this._availableseasons = new Subject<any>();
    this.availableseasons = this._availableseasons.asObservable();
  }






  fetchDriverDetails( driverID: string ) {

      this.helperService.getAction('drivers/' + driverID)
        .subscribe((data) => {

          console.log(data);

          const driver = data.MRData.DriverTable.Drivers[0];
          driver.country = this.helperService.getCountryFlag(driver.nationality);
          driver.fullName = driver.givenName + ' ' + driver.familyName;

          this._driver.next( driver );
          },
          error => {
            this.helperService._errors.next(error.error);
          });



  }

  fetchDriverResults(driverID: string, season = '2019') {


    this.helperService.getAction(season + '/drivers/' + driverID + '/results')
      .subscribe((data) => {

          console.log(data);

          this.dataStore.seasons[ season ] =
            data.MRData.RaceTable.Races.map((race) => {
              race.round = parseInt(race.round ,  10);
              race.result = parseInt(race.Results[0].position , 10);
              race.grid = parseInt(race.Results[0].grid , 10);
              race.points = parseInt(race.Results[0].points , 10);
              race.status = race.Results[0].status;

              if (race.Results[0].hasOwnProperty('Constructor') && race.Results[0].Constructor ) {
                race.constructorName = race.Results[0].Constructor.name;
              } else {
                race.constructorName = 'No team yet';
              }

              if (race.result < race.grid) {
                if ( race.grid - race.result < 2 ) {
                  race.value = -2;
                } else if ( race.grid - race.result < 6 ) {
                  race.value = -4;
                } else {
                  race.value = -6;
                }
              } else if ( race.result > race.grid) {
                if ( race.result - race.grid < 2 ) {
                  race.value = 2;
                } else if ( race.result - race.grid < 6 ) {
                  race.value = 4;
                } else {
                  race.value = 6;
                }
              } else {
                race.value = 0;
              }


              race.country = this.helperService.getCountryFlag(race.Circuit.Location.country);

              return race;
            });

          this._results.next( [...this.dataStore.seasons[ season ]] );
        },
        error => {
          this.helperService._errors.next(error.error);
        });

  }

  fetchDriverSeasons( driverID: string ) {

    this.helperService.getAction('drivers/' + driverID + '/seasons')
      .subscribe((data) => {
          this.dataStore.availableseasons = data.MRData.SeasonTable.Seasons.reverse();
          this._availableseasons.next( Object.assign( {} , this.dataStore).availableseasons );
        },
        error => {
          this.helperService._errors.next(error.error);
        });
  }



}
