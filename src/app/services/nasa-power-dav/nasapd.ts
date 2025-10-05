import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type NasaCommunity = 'AG' | 'RE' | 'SB'; // AG: Agroclimatología, RE: Energía renovable, SB: Edificación sostenible
export type NasaTemporal = 'hourly' | 'daily' | 'monthly' | 'climatology';
export type NasaScope = 'point' | 'regional' | 'global';

@Injectable({
  providedIn: 'root'
})
export class Nasapd {

  private readonly baseUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene datos meteorológicos del NASA POWER DAV.
   * @param params objeto con parámetros: community, parameters, start, end, lat, lon, temporal
   */
  getData(params: {
    community?: string;
    parameters: string;
    start: string;
    end: string;
    latitude: number;
    longitude: number;
    temporal?: 'hourly' | 'daily' | 'monthly';
    format?: 'JSON' | 'CSV';
  }): Observable<any> {
    const {
      community = 'AG',
      parameters,
      start,
      end,
      latitude,
      longitude,
      temporal = 'daily',
      format = 'JSON',
    } = params;

    const url = `${this.baseUrl}/temporal/${temporal}/point?parameters=${parameters}&community=${community}&latitude=${latitude}&longitude=${longitude}&start=${start}&end=${end}&format=${format}`;
    return this.http.get(url);
  }

  /**
   * Devuelve lista de parámetros meteorológicos disponibles en NASA POWER DAV.
   * (Para llenar dropdowns o checkboxes)
   */
  getAvailableParameters(): { group: string; items: { code: string; label: string; unit: string }[] }[] {
    return [
      {
        group: 'Temperatura',
        items: [
          { code: 'T2M', label: 'Temperatura promedio a 2m', unit: '°C' },
          { code: 'T2M_MAX', label: 'Temperatura máxima diaria', unit: '°C' },
          { code: 'T2M_MIN', label: 'Temperatura mínima diaria', unit: '°C' }
        ]
      },
      {
        group: 'Radiación solar',
        items: [
          { code: 'ALLSKY_SFC_SW_DWN', label: 'Radiación solar total', unit: 'kWh/m²/día' },
          { code: 'CLRSKY_SFC_SW_DWN', label: 'Radiación solar cielo despejado', unit: 'kWh/m²/día' }
        ]
      },
      {
        group: 'Viento',
        items: [
          { code: 'WS10M', label: 'Velocidad del viento a 10m', unit: 'm/s' },
          { code: 'WS50M', label: 'Velocidad del viento a 50m', unit: 'm/s' }
        ]
      },
      {
        group: 'Humedad / Precipitación',
        items: [
          { code: 'RH2M', label: 'Humedad relativa a 2m', unit: '%' },
          { code: 'PRECTOTCORR', label: 'Precipitación total corregida', unit: 'mm/día' }
        ]
      }
    ];
  }

  /**
   * Ayuda a formatear fechas para las consultas (YYYYMMDD, YYYYMM, YYYY)
   */
  formatDate(date: Date, mode: 'daily' | 'monthly' | 'yearly'): string {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');

    switch (mode) {
      case 'yearly': return `${y}`;
      case 'monthly': return `${y}${m}`;
      default: return `${y}${m}${d}`;
    }
  }

    /**
   * Obtiene datos tipo GRID de NASA POWER (para mapas de calor)
   */
  getGridData(params: {
    community?: string;
    parameters: string;
    start: string;
    end: string;
    bbox: string; // formato: lat_min,lon_min,lat_max,lon_max
    temporal?: 'daily' | 'monthly';
    format?: 'JSON' | 'CSV';
    resolution?: number; // resolución en grados (0.5 = 50km aprox)
  }): Observable<any> {
    const {
      community = 'AG',
      parameters,
      start,
      end,
      bbox,
      temporal = 'daily',
      format = 'JSON',
      resolution = 0.5,
    } = params;

    const url = `${this.baseUrl}/temporal/${temporal}/regional?parameters=${parameters}&community=${community}&start=${start}&end=${end}&bbox=${bbox}&format=${format}&resolution=${resolution}`;
    return this.http.get(url);
  }


  getRegionalData(params: {
  parameters: string;
  start: string;
  end: string;
  bbox: string; // lat_min,lon_min,lat_max,lon_max
  community?: string;
  format?: string;
  resolution?: number;
}): Observable<any> {
  const {
    parameters,
    start,
    end,
    bbox,
    community = 'AG',
    format = 'JSON',
    resolution = 0.25,
  } = params;

  const url = `http://localhost:4000/api/temporal/daily/regional?parameters=${parameters}&community=${community}&start=${start}&end=${end}&bbox=${bbox}&format=${format}&resolution=${resolution}`;
  return this.http.get(url);
}

}
