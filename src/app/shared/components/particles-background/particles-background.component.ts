import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgxParticlesModule } from '@tsparticles/angular';
import { Engine } from '@tsparticles/engine';
import { loadStarsPreset } from '@tsparticles/preset-stars';

@Component({
  selector: 'app-particles-background',
  standalone: true,
  imports: [NgxParticlesModule],
  templateUrl: './particles-background.component.html',
  styleUrls: ['./particles-background.component.scss']
})
export class ParticlesBackgroundComponent {
  id = 'tsparticles';
  isBrowser: boolean;
  particlesOptions: any;
  particlesInit: ((engine: Engine) => Promise<void>) | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.particlesOptions = {
        preset: 'stars',
        background: {
          color: { value: '#000' }
        },
        particles: {
          number: { value: 80 },
          color: { value: ['#ffffff', '#07f'] },
          links: {
            enable: true,
            color: '#ffffff'
          },
          move: {
            speed: 1,
            enable: true
          },
          shape: { type: 'circle' }
        }
      };

      this.particlesInit = async (engine: Engine) => {
        try {
          await loadStarsPreset(engine);
        } catch (error) {
          console.error('Failed to initialize particles:', error);
        }
      };
    }
  }

  particlesLoaded(container: any): void {
    if (this.isBrowser) {
      console.log('Particles container loaded');
    }
  }
}
