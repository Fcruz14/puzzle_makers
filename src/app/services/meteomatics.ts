import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeteomaticsService {
  private baseUrl = 'https://api.meteomatics.com';

  constructor(private http: HttpClient) {}

  /**
   * Request actual o forecast
   * @param datetime formato ISO: "2025-10-01T00:00:00ZP1D:PT1H"
   * @param parameters ej: "t_2m:C,relative_humidity_2m:p"
   * @param location lat,lon ej: "47.4245,9.3767"
   * @param format "json" | "html" | "csv" | "xml"
   * @param options query extra ej: { model: "mix" }
   */
  getWeather(datetime: string, parameters: string, location: string, format: string = 'json', options: any = {}): Observable<any> {
    let params = new HttpParams();
    Object.keys(options).forEach(key => {
      params = params.set(key, options[key]);
    });
    const url = `${this.baseUrl}/${datetime}/${parameters}/${location}/${format}`;
    return this.http.get(url, { params });
  }

  /**
   * Datos históricos
   */
  getHistorical(start: string, end: string, interval: string, parameters: string, location: string, format: string = 'json'): Observable<any> {
    const datetime = `${start}--${end}:${interval}`;
    const url = `${this.baseUrl}/${datetime}/${parameters}/${location}/${format}`;
    return this.http.get(url);
  }

  /**
   * Climatología
   */
  getClimatology(start: string, end: string, parameters: string, location: string, format: string = 'json'): Observable<any> {
    const datetime = `${start}--${end}`;
    const url = `${this.baseUrl}/climatology/${datetime}/${parameters}/${location}/${format}`;
    return this.http.get(url);
  }

  /**
   * Modelos ensemble (probabilísticos)
   */
  getEnsemble(datetime: string, parameters: string, location: string, format: string = 'json'): Observable<any> {
    const url = `${this.baseUrl}/${datetime}/${parameters}/${location}/${format}?ens=all`;
    return this.http.get(url);
  }

  /**
   * Datos solares (ej: irradiancia)
   */
  getSolar(datetime: string, parameters: string, location: string, format: string = 'json'): Observable<any> {
    const url = `${this.baseUrl}/${datetime}/${parameters}/${location}/${format}`;
    return this.http.get(url);
  }

  /**
   * Map tiles (para mapas)
   */
  getTile(layer: string, z: number, x: number, y: number, format: string = 'png'): Observable<Blob> {
    const url = `${this.baseUrl}/maps/${layer}/${z}/${x}/${y}.${format}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  /**
   * Datos horarios o intervalos personalizados
   */
  getTimeSeries(start: string, end: string, interval: string, parameters: string, location: string, format: string = 'json'): Observable<any> {
    const datetime = `${start}--${end}:${interval}`;
    const url = `${this.baseUrl}/${datetime}/${parameters}/${location}/${format}`;
    return this.http.get(url);
  }
}
