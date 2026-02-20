import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(public router: Router) {}
  trenutnaRuta: string = '';

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.trenutnaRuta = event.urlAfterRedirects;
      }
    });
  }


  nastavnikStrana(): boolean {
    return this.trenutnaRuta.startsWith('/nastavnik');
  }

  adminStrana(): boolean {
    return this.trenutnaRuta.startsWith('/admin');
  }

  gostStrana(): boolean {
    return !this.nastavnikStrana() && !this.adminStrana();
  }

  daLiJeUlogovan(): boolean{
    let korisnik = localStorage.getItem("ulogovan"); 
    if (korisnik != null){
      return true;
    }
    return false;
  }

}
