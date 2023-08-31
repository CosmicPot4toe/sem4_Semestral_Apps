import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router) { }
  dato!:String;
  
	// UserModel = '';
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;
  onUserInput(ev: { target: any; }) {
    const value = ev.target!.value;
    this.dato = value;
  }

  validarLogin(){
    // this.dato = this.UserModel;
    this.router.navigate(['/home',this.dato]);
  }

  ngOnInit() {
  }

}
