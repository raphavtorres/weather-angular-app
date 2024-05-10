import { Component, Output, EventEmitter, Input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  bootstrapThermometerSnow,
  bootstrapThermometerSun,
  bootstrapWater,
  bootstrapWind
} from '@ng-icons/bootstrap-icons';
import { WeatherInfoComponent } from '../weather-info/weather-info.component';
import { CommonModule, DecimalPipe } from "@angular/common";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { InputComponent } from '../input/input.component';
import { WeatherData } from '../../models/weather.model';


interface CityForm {
  city: FormControl
}

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    WeatherInfoComponent,
    ReactiveFormsModule,
    FormsModule,
    DecimalPipe,
    InputComponent,
    CommonModule
  ],
  providers: [
    provideIcons({
      bootstrapThermometerSnow,
      bootstrapThermometerSun,
      bootstrapWater,
      bootstrapWind
    })
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  @Input("temperature")
  @Output("submit") onSubmit = new EventEmitter();

  cityForm!: FormGroup<CityForm>;

  constructor(
    private weatherService: WeatherService
  ) {
    this.cityForm = new FormGroup({
      city: new FormControl('', [Validators.required, Validators.minLength(1)]),
    })
  }

  weatherData?: WeatherData;

  submit() {
    this.weatherService.getWeatherData(
      this.cityForm.value.city
    ).subscribe({
      next: (response) => this.weatherData = response,
      error: (err) => console.log(err)
    })
  }
}
