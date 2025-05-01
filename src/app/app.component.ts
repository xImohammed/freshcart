import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./feature/layout/components/footer/footer.component";
import { NgxSpinnerComponent } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { ParticlesBackgroundComponent } from "./shared/components/particles-background/particles-background.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NgxSpinnerComponent, CommonModule, ParticlesBackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
