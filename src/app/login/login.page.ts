import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app-model';
import { AnimationController, Animation  } from '@ionic/angular';
@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	
	@ViewChild('div',{ read : ElementRef }) div!:ElementRef;
	private load!:Animation
	
	constructor(private router:Router,private animCtrl:AnimationController) { }
	usuarios:User[]=[
		{id:1,nombre:'pepito',pass:'1234'},
		{id:2,nombre:'Alejandro',pass:'4321'},
		{id:3,nombre:'Renato',pass:'0001'},
	];

	dato!:String;
	user=""
	pw=""

	ngAfterViewInit(){
		this.load = this.animCtrl
			.create()
			.addElement(this.div.nativeElement)
			.duration(310)
			.fromTo('transform', 'translateX(0px)', 'translateX(-300px)');
	}
	
	contador= 0;
	async validarLogin(){
		for(const x of this.usuarios ){
			if(x.nombre===this.user){
				if(x.pass ===this.pw){
					this.contador = this.contador+1;
					console.log("usuario y pw correctos! bienvenido")
					await this.load.play();
					await this.router.navigate(['/home', this.user]);//si usuario y pw son correctos
					//reset fields
					this.pw="";
					this.user="";
					this.load.stop();
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
