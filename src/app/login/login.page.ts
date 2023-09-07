import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app-model';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router:Router) { }
  usuarios:User[]=[
    {id:1,nombre:'pepito',pass:'1234'}
  ];
  dato!:String;
  user=""
  pw=""

  validarLogin(){
    // this.dato = this.UserModel;
    this.router.navigate(['/home',this.user]);
  }

  ngOnInit() {
  }

}
