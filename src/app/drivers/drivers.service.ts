import {Injectable} from '@angular/core';
import {HelperService} from '../common/helper.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable()
export class DriversService {

  private _drivers: Subject<any>;
  public readonly drivers: Observable<any>;

  private _seasons: Subject<any>;
  public readonly seasons: Observable<any>;

  private dataStore = {
    drivers : {} ,
    seasons : []
  };

  constructor(
    private helperService: HelperService
  ) {

    this._drivers = new Subject<any>();
    this.drivers = this._drivers.asObservable();
    this._seasons = new Subject<any>();
    this.seasons = this._seasons.asObservable();
  }

  fetchDrivers( season?: string) {

    if (season && this.dataStore.drivers.hasOwnProperty(season)) {

      this._drivers.next( Object.assign( {} , this.dataStore).drivers[ season ] );
    } else {

      let url = 'current/driverStandings';
      if (season) {
        url = season + '/driverStandings';
      }
      this.helperService.getAction(url)
        .subscribe((data) => {

            this.dataStore.drivers[ data.MRData.StandingsTable.StandingsLists[0].season ] =
              data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map((driver) => {
                driver.position = parseInt(driver.position ,  10);
                driver.points = parseInt(driver.points ,  10);
                driver.wins = parseInt(driver.wins ,  10);
                driver.fullName = driver.Driver.givenName + ' ' + driver.Driver.familyName;
                driver.constructorName = driver.Constructors[0].name;
                return driver;
              });

            this._drivers.next( Object.assign( {} , this.dataStore).drivers[ data.MRData.StandingsTable.StandingsLists[0].season ] );
          },
          error => {
            this.helperService._errors.next(error.error);
          });

    }

  }

  fetchAvailableSeasons() {
    this.helperService.getAction('seasons' , {limit : 1000})
      .subscribe((data: any) => {

        this.dataStore.seasons = data.MRData.SeasonTable.Seasons.reverse();

        this._seasons.next( Object.assign( {} , this.dataStore).seasons );
        },
        error => {
          this.helperService._errors.next(error.error);
        });
  }
}
