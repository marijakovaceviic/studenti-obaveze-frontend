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
   uspeh: string = "";

   ngOnInit():void {
    this.idObaveze = Number(this.route.snapshot.paramMap.get('idObaveze'));
    
    let student = localStorage.getItem("ulogovan");
    if (student != null) {
      this.ulogovan = JSON.parse(student);
    }

    this.obavezeS.dohvatanjeObavezePoIdu(this.idObaveze).subscribe(
      data=>{
        if (data != null){
          this.obaveza = data;
        }
      }
    )

    this.prijaveS.proveriPrijavu(this.ulogovan.id, this.idObaveze).subscribe(
      status=>{
        if (status == 1){
          this.prijavljen = true;
        }
      }
    )
   }

   togglePrijava(){
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
          }
        }
      )
    }
   }

   onFileSelected(event: any) {
    this.izabraniFajl = event.target.files[0];
  }

  predajDomaci() {
    this.greska = "";
    this.uspeh = "";

    if (!this.izabraniFajl) {
      this.greska = "Morate izabrati fajl.";
      return;
    }

    const formData = new FormData();
    formData.append("file", this.izabraniFajl);
    formData.append("idObaveza", this.obaveza.id.toString());
    formData.append("idStudent", this.ulogovan.id.toString());
    formData.append("student", this.ulogovan.email.substring(0, 8));

    this.predajeS.predajDomaci(formData).subscribe(
      //odgovor kako hvatam
      //onda :
      /*
      this.emailS.slanjeMejlaOUspesnostiPredaje(this.ulogovan.id, this.idObaveze).subscribe(
        
      )
      */
     //this.uspeh = "Domaći je uspešno predat!";
    )
  
  }

  
}
