import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'movie-front';
  constructor(private router: Router) {}

  public toHome(): void {
    this.router.navigate(['/movies']);
  }
}
