import { Component, Output, EventEmitter } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { 
  bootstrapThermometerSnow, 
  bootstrapThermometerSun, 
  bootstrapWater, 
  bootstrapWind 
} from '@ng-icons/bootstrap-icons';
import { WeatherInfoComponent } from '../weather-info/weather-info.component';
import { DecimalPipe } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';


interface CityForm {
  city: FormControl
}

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    WeatherInfoComponent,
    ReactiveFormsModule,
    DecimalPipe
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
  @Output("submit") onSubmit = new EventEmitter();

  cityForm!: FormGroup<CityForm>;

  constructor(
    private weatherService: WeatherService
  ) {
    this.cityForm = new FormGroup({
      city: new FormControl('', [Validators.required, Validators.minLength(1)]),
    })
  }

  submit() {
    this.weatherService.getWeatherData(
      this.cityForm.value.city
    ).subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err)
    })
  }
}
