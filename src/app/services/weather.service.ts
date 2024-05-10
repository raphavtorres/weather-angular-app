import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  API_BASEURL = 'https://api.openweathermap.org/data/2.5/weather?';
  API_KEY = '4f53ba428df46714421147fb968193f9';

  constructor(private httpClient: HttpClient) { }

  getWeatherData(cityName: string): Observable<WeatherData>{
    return this.httpClient.get<WeatherData>(this.API_BASEURL, {
      params: new HttpParams()
      .set('q', cityName)
      .set('appid', this.API_KEY)
      .set('units', 'metric')
      .set('lang', 'pt_br')
      .set('mode', 'json')
    })
  }
}