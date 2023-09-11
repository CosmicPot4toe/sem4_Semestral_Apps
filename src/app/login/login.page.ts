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
		{id:1,nombre:'pepito',pass:'1234'},
		{id:2,nombre:'Alejandro',pass:'4321'},
		{id:3,nombre:'Renato',pass:'0001'},
	];
	dato!:String;
	user=""
	pw=""

	
	contador= 0;
	validarLogin(){
		for(const x of this.usuarios ){
			if(x.nombre===this.user){
				if(x.pass ===this.pw){
					this.contador = this.contador+1;
					console.log("usuario y pw correctos! bienvenido")
					this.router.navigate(['/home', this.user]);//si usuario y pw son correctos
					//reset fields
					this.pw="";
					this.user="";
				}
			}
		}
		if(this.contador== 0){
			console.log("usuario y/o password incorrectos!");
		}
	}

	ngOnInit() {
	}

}
