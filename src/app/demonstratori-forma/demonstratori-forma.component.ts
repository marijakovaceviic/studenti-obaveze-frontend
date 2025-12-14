import { Component } from '@angular/core';
import { Nastavnik } from '../modeli/nastavnik';
import { DemonstratoriService } from '../servisi/demonstratori.service';
import { EmailService } from '../servisi/email.service';

@Component({
  selector: 'app-demonstratori-forma',
  templateUrl: './demonstratori-forma.component.html',
  styleUrls: ['./demonstratori-forma.component.css']
})
export class DemonstratoriFormaComponent {

  constructor(private demonstratoriS: DemonstratoriService, private emailS: EmailService){}

  pdfFajl: File | null = null;
  datumOd: string = "";
  datumDo: string = "";

  ulogovan: Nastavnik = new Nastavnik();

  greska: string = "";
  uspeh: string = "";
  
  ngOnInit(): void{
    let nastavnik = localStorage.getItem("ulogovan");
    if (nastavnik != null) {
      this.ulogovan = JSON.parse(nastavnik);
    }
  }

  izabranPdf(event: any) {
    this.pdfFajl = event.target.files[0] ?? null;
  }

  cuvanjeForme() {
    this.greska = "";
    this.uspeh = "";
    const formData = new FormData();

    formData.append('pocetak', this.datumOd);
    formData.append('kraj', this.datumDo);
    formData.append('nastavnikId', this.ulogovan.id.toString());

    if (!this.pdfFajl) {
      this.greska = "Nije izabran pdf fajl!";
      return;
    } 
    else{
      formData.append('pdf', this.pdfFajl);

      this.demonstratoriS.otvaranjePrijave(formData).subscribe(
        status =>{
          if (status == 0){
            this.uspeh = "Forma je uspešno dodata!";
            this.datumOd = "";
            this.datumDo = "";
            this.pdfFajl = null; //ovo nije dovoljno!
            this.emailS.otvorenaPrijavaZaDemonstratore().subscribe(

            )
          }
          
        }
        
      )
    }


  }

}
