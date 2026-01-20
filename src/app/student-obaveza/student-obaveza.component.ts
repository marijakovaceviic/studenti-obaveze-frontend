import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObavezeService } from '../servisi/obaveze.service';
import { Obaveza } from '../modeli/obaveza';
import { PrijaveService } from '../servisi/prijave.service';
import { Student } from '../modeli/student';
import { PredajeService } from '../servisi/predaje.service';
import { EmailService } from '../servisi/email.service';

@Component({
  selector: 'app-student-obaveza',
  templateUrl: './student-obaveza.component.html',
  styleUrls: ['./student-obaveza.component.css']
})
export class StudentObavezaComponent {
   constructor(private route: ActivatedRoute, private obavezeS: ObavezeService, private prijaveS: PrijaveService, 
    private predajeS: PredajeService, private emailS: EmailService) {}
   
   obaveza: Obaveza = new Obaveza();
   idObaveze: number = 0;
   prijavljen: boolean = false;
  
   ulogovan: Student = new Student();

   izabraniFajl: File | null = null;
   greska: string = "";
   greskaPrijava: string = "";
   uspeh: string = "";
   dozvoljenPrikaz: boolean = false;
   nedozvoljenaPrijava: string = "";

   ngOnInit():void {
    this.idObaveze = Number(this.route.snapshot.paramMap.get('idObaveze'));
    
    let student = localStorage.getItem("ulogovan");
    if (student != null) {
      this.ulogovan = JSON.parse(student);
    }

    this.obavezeS.dohvatanjeObavezePoIdu(this.idObaveze).subscribe(
      data=>{
        if (data != null){
          const sada = new Date();
          const kraj = new Date(data.kraj);

          if (sada > kraj) {
            this.nedozvoljenaPrijava = "Rok za ovu obavezu je istekao!"; 
            this.dozvoljenPrikaz = false;
            return;
          }

          this.obaveza = data;
          this.dozvoljenPrikaz = true;
        }
      }
    )
    if (localStorage.getItem('ulogovan') && this.ulogovan.tip == "student"){
      this.prijaveS.proveriPrijavu(this.ulogovan.id, this.idObaveze).subscribe(
        status=>{
          if (status == 1){
            this.prijavljen = true;
          }
        }
      )
    }
    
   }

   togglePrijava(){
    if (!localStorage.getItem('ulogovan')){
      this.greskaPrijava = "Prvo se morate prijaviti u sistem!";
      return;
    }
    if (this.ulogovan.tip != "student"){
      this.greskaPrijava = "Nemate dozvolu za prijavu obaveze!";
      return;
    }
    if (!this.prijavljen){
      this.prijaveS.novaPrijava(this.ulogovan.id, this.idObaveze).subscribe(
        info =>{
          if (info > 0){
            this.prijavljen = true;
            this.emailS.slanjeMejlaOUspesnostiPrijave(this.ulogovan.id, this.idObaveze).subscribe(
      
            )
          }
        }
      )
    }
    else{
      this.prijaveS.odjava(this.ulogovan.id, this.idObaveze).subscribe(
        status=>{
          if (status > 0){
            this.prijavljen = false;
            this.emailS.odjavaSaObaveze(this.ulogovan.id, this.idObaveze).subscribe(
              
            )
          }
        }
      )
    }
   }

   onFileSelected(event: any) {
    this.greska = "";
    this.uspeh = "";

    const fajl: File = event.target.files[0];
    if (!fajl) return;

    const maksVel = 25 * 1024 * 1024; 

    if (fajl.size > maksVel) {
      this.greska = "Zip fajl ne sme biti veći od 25 MB!";
      this.izabraniFajl = null;
      event.target.value = ''; 
      return;
    }
     if (!fajl.name.toLowerCase().endsWith('.zip')) {
       this.greska = "Dozvoljeni su samo zip fajlovi!";
       this.izabraniFajl = null;
       event.target.value = '';
       return;
     }

    this.izabraniFajl = fajl;
  }

  predajDomaci() {
    this.greska = "";
    this.uspeh = "";
    if (!this.ulogovan){
      this.greska = "Morate se prijaviti da biste predali rad!";
      return;
    }
    if (this.ulogovan.tip != "student"){
      this.greska = "Nemate dozvolu za predaju radova!";
      return;
    }
    if (!this.izabraniFajl) {
      this.greska = "Morate izabrati fajl.";
      return;
    }

    const formData = new FormData();
    formData.append("file", this.izabraniFajl);
    formData.append("idObaveza", this.obaveza.id.toString());
    formData.append("idStudent", this.ulogovan.id.toString());
    formData.append("student", this.ulogovan.email.substring(0, 8));

    this.predajeS.predajaDomaceg(formData).subscribe(
      status=>{
        if (status != 0){
          this.greska = "Došlo je do greške prilikom predaje rada!";
        }
        else{
          this.uspeh = "Uspešno ste predali rad!";
          this.emailS.slanjeMejlaOUspesnostiPredaje(this.ulogovan.id, this.idObaveze).subscribe(
        
          ) 
        }
      }
    )
  
  }

  
}
