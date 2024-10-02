import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import * as _ from 'lodash';
import {ErrorDialogComponent} from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {
  }

  buildRequestConfig(params, data?) {
    const {headers} = this.buildHttpHeadersDefault();
    const reqConfig = { headers, params: {} };

    if (params) {
      reqConfig.params = new HttpParams({fromObject: params});
    }
    if (data) {
      reqConfig['body'] = data;
    }
    return reqConfig;
  }

  buildUrlWithPathParameters(url, pathParams) {
    const paramsPlaceholderRegexp = /:([a-zA-Z0-9]+)/g;
    if (!url.match(paramsPlaceholderRegexp) && !pathParams) {
      return url;
    }
    return this.replacePathParametesInUrl(url, paramsPlaceholderRegexp, pathParams);
  }

  replacePathParametesInUrl(urlTemplate, parametersRegExp, pathParams) {
    _.templateSettings.interpolate = parametersRegExp; // /:([a-zA-Z0-9]+)/g
    const compiled = _.template(urlTemplate);
    return compiled(pathParams);
  }

  isEmptyOrNull(obj) {
    return obj === undefined || _.isEmpty(obj);
  }

  getApiUrl(callDescription) {
    const url = callDescription.url;
    if (!url) {
      throw new Error('L\'url è nullo: verificare la configurazione dell\'API in api.ts');
    }
    return `${environment.base_url}${url}`;
  }

  get<T>(callDescription, params, pathParams): Observable<T> {
    const url = this.getApiUrl(callDescription);
    const finalUrl = this.buildUrlWithPathParameters(url, pathParams);
    return this.http.get<T>(
        finalUrl, this.buildRequestConfig(params)
    );
  }

  put<T>(callDescription, data, params, pathParams): Observable<T> {
    const url = this.getApiUrl(callDescription);
    const finalUrl = this.buildUrlWithPathParameters(url, pathParams);
    return this.http.put<T>(
        finalUrl,
        JSON.stringify(data),
        this.buildRequestConfig(params)
    );
  }

  post<T>(callDescription, data, params, pathParams): Observable<T> {
    const url = this.getApiUrl(callDescription);
    const finalUrl = this.buildUrlWithPathParameters(url, pathParams);
    return this.http.post<T>(
        finalUrl,
        JSON.stringify(data),
        this.buildRequestConfig(params)
    );
  }

  del<T>(callDescription, params, data, pathParams): Observable<T> {
    const url = this.getApiUrl(callDescription);
    const finalUrl = this.buildUrlWithPathParameters(url, pathParams);
    return this.http.delete<T>(
        finalUrl,
        this.buildRequestConfig(null, data)
    );
  }

  patch<T>(callDescription, data, pathParams): Observable<T> {
    const url = this.getApiUrl(callDescription);
    const finalUrl = this.buildUrlWithPathParameters(url, pathParams);
    return this.http.patch<T>(
        finalUrl,
        JSON.stringify(data),
        this.buildRequestConfig(null)
    );
  }

  dispatchRestCall(callDescription, {params = {}, data = {}, pathParams = {}} = {}) {
    let result;
    switch (callDescription.method) {
      case 'GET':
        result = this.get(callDescription, params, pathParams);
        break;
      case 'POST':
        result = this.post(callDescription, data, params, pathParams);
        break;
      case 'PUT':
        result = this.put(callDescription, data, params, pathParams);
        break;
      case 'DELETE':
        result = this.del(callDescription, params, data, pathParams);
        break;
      case 'PATCH':
        result = this.patch(callDescription, data, pathParams);
        break;
      default:
        console.error('ERROR: Invalid request method: ' + callDescription.method);
    }
    return result;
  }

  buildHttpHeadersDefault() {
    const httpOptionsDefault = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if (environment && environment.hasOwnProperty('REMOTE_USER')) {
      httpOptionsDefault.headers = httpOptionsDefault.headers.set('REMOTE_USER', environment['REMOTE_USER']);
    }

    return httpOptionsDefault;
  }
}


