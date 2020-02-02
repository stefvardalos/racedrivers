import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public _errors: Subject<any>;
  public readonly errors: Observable<any>;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {

    this._errors = new Subject<any>();
    this.errors = this._errors.asObservable();

    this.errors.subscribe((err) => {
      this.shotNotification(err);
    });
  }



  private REMOTE_ENDPOINT = 'https://ergast.com/api/f1/';

  getAction( fetchEndpoint: string, params: any = {} , dataFormat: string = 'json') {

    let endpointURL = this.REMOTE_ENDPOINT + fetchEndpoint + '.' + dataFormat;
    const keyParams = Object.keys(params);
    if (keyParams.length > 0) {
      endpointURL = endpointURL + '?';
      keyParams.forEach((keyParam , index) => {
        endpointURL = endpointURL + keyParam + '=' + params[keyParam];
        if (index !== keyParams.length - 1) {
          endpointURL = endpointURL + '&';
        }
      });
    }
    return this.http.get(
      endpointURL
    ) as Observable<any>;
  }


  getCountryFlag( element ) {
    const flag = element.toLowerCase();
    if (flag === 'dutch' || flag === 'Netherlands') {
      return 'nl';
    } else if (flag === 'spanish' || flag === 'spain') {
      return 'es';
    } else if (flag === 'danish' || flag === 'denmark') {
      return 'dk';
    } else if (flag === 'polish' || flag === 'poland') {
      return 'pl';
    } else if (flag === 'swedish' || flag === 'sweden') {
      return 'se';
    } else if (flag === 'japanese' || flag === 'japan') {
      return 'jp';
    } else if (flag === 'polish' || flag === 'poland') {
      return 'pl';
    } else if (flag === 'portuguese' || flag === 'portugal') {
      return 'pt';
    } else if (flag === 'swiss' || flag === 'switzerland') {
      return 'ch';
    } else if (flag === 'english' || flag === 'british' || flag === 'uk') {
      return 'gb';
    } else if (flag === 'korean' || flag === 'korean' || flag === 'korea') {
      return 'kr';
    } else if (flag === 'turkish' || flag === 'turkey') {
      return 'tr';
    } else {
      return flag.substring(0, 2);
    }
  }

  shotNotification(alertmsg: string , level = 0) {
    if (level === 0) {
      this.toastr.error(alertmsg , 'Error!');
    } else {
      this.toastr.info(alertmsg , 'Info!');
    }
  }

}
