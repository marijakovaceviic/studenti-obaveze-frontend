import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KorisniciService } from '../servisi/korisnici.service';

@Component({
  selector: 'app-zaboravljena-lozinka',
  templateUrl: './zaboravljena-lozinka.component.html',
  styleUrls: ['./zaboravljena-lozinka.component.css']
})
export class ZaboravljenaLozinkaComponent {

  constructor(private route: ActivatedRoute, private korisniciS: KorisniciService) {}

  uloga: string = "";
  email: string = "";
  greska: string = "";
  uspeh: string = "";

  ngOnInit() {
    this.uloga = this.route.snapshot.paramMap.get('uloga')!;
  }

  zaboravljenaLozinka(){
    if (!this.email){
      this.greska = "Morate uneti email adresu!";
      return;
    }
    this.korisniciS.zaboravljenaLozinka(this.email, this.uloga).subscribe(
      status =>{
        if (status == -1){
          this.greska = "Ne postoji registrovan korisnik sa unetom adresom!";
        }
        else if (status == 0){
          this.uspeh = "Poslata je privremena lozinka!";
        }
      }
    )
    
  }
}
