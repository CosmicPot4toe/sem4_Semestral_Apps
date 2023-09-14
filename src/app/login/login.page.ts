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

	
	@ViewChild('page',{ read : ElementRef }) page!:ElementRef;
	private anim!:Animation

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
		this.anim = this.animCtrl
			.create()
			.addElement(this.page.nativeElement)
			.duration(1000)
			.fromTo('opacity', '1', '0.01');
	}
	
	contador= 0;
	async validarLogin(){
		for(const x of this.usuarios ){
			if(x.nombre===this.user){
				if(x.pass ===this.pw){
					this.contador = this.contador+1;
					console.log("usuario y pw correctos! bienvenido")
					await this.anim.play();
					await this.router.navigate(['/home', this.user]);//si usuario y pw son correctos
					this.anim.stop();
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
