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

  private dataStore = {
    seasons : {}
  };

  constructor(
    private helperService: HelperService
  ) {

    this._driver = new Subject<any>();
    this.driver = this._driver.asObservable();
    this._results = new Subject<any>();
    this.results = this._results.asObservable();
  }






  fetchDriverDetails( driverID: string ) {

      this.helperService.getAction('drivers/' + driverID)
        .subscribe((data) => {

          console.log(data);

            // this.dataStore.drivers[ data.MRData.StandingsTable.StandingsLists[0].season ] =
            //   data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map((driver) => {
            //     driver.position = parseInt(driver.position ,  10);
            //     driver.points = parseInt(driver.points ,  10);
            //     driver.wins = parseInt(driver.wins ,  10);
            //     driver.fullName = driver.Driver.givenName + ' ' + driver.Driver.familyName;
            //     if (driver.hasOwnProperty('Constructors') && driver.Constructors && driver.Constructors.length > 0) {
            //       driver.constructorName = driver.Constructors[0].name;
            //     } else {
            //       driver.constructorName = 'No team yet';
            //     }
            //
            //     driver.nationality = driver.Driver.nationality.toLowerCase();
            //     if (driver.nationality === 'dutch') {
            //       driver.nationality = 'nl';
            //     } else if (driver.nationality === 'spanish') {
            //       driver.nationality = 'es';
            //     } else if (driver.nationality === 'danish') {
            //       driver.nationality = 'dk';
            //     } else if (driver.nationality === 'polish') {
            //       driver.nationality = 'pl';
            //     } else if (driver.nationality === 'swedish') {
            //       driver.nationality = 'se';
            //     } else if (driver.nationality === 'japanese') {
            //       driver.nationality = 'jp';
            //     } else if (driver.nationality === 'polish') {
            //       driver.nationality = 'pl';
            //     } else if (driver.nationality === 'portuguese') {
            //       driver.nationality = 'pt';
            //     } else if (driver.nationality === 'swiss') {
            //       driver.nationality = 'ch';
            //     } else {
            //       driver.nationality = driver.nationality.substring(0, 2);
            //     }
            //     return driver;
            //   });
            //
            // this._drivers.next( Object.assign( {} , this.dataStore).drivers[ data.MRData.StandingsTable.StandingsLists[0].season ] );
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

              race.country = this.helperService.getCountryFlag(race.Circuit.Location.country);

              return race;
            });

          this._results.next( [...this.dataStore.seasons[ season ]] );
        },
        error => {
          this.helperService._errors.next(error.error);
        });

  }





}
