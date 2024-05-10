import { Component, Input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-weather-info',
  standalone: true,
  imports: [
    NgIconComponent,
  ],
  templateUrl: './weather-info.component.html',
  styleUrl: './weather-info.component.scss'
})
export class WeatherInfoComponent {
  @Input() icon!: string;
  @Input() label!: string;
  @Input() text!: string;
  @Input() unit!: string;
}
