import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(public router: Router) {}

  get isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  get isHomePage(): boolean {
    return this.router.url === '/';
  }
}
