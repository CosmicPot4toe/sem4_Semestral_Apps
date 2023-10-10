import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/fb/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
//   dato!:string|null;
	
	@ViewChild('div',{ read : ElementRef }) div!:ElementRef;
	private anim!:Animation

	@ViewChild('E',{ read : ElementRef }) E!:ElementRef;
	private EE!:Animation
	
	constructor(private activeRoute:ActivatedRoute,private animCtrl:AnimationController,public authService:AuthService
		,public route:Router) {}
	ngAfterViewInit(){
		this.anim = this.animCtrl
			.create()
			.addElement(this.div.nativeElement)
			.duration(1000)
			.fromTo('transform', 'translateX(300px)', 'translateX(0px)')
			.fromTo('opacity', '0', '1');
			this.anim.play();
		this.EE = this.animCtrl
			.create()
			.addElement(this.E.nativeElement)
			.duration(2000)
			.fromTo('transform', 'translateY(3000px)', 'translateY(0px)')
			this.EE.play();

	}
	async logout(){
		await this.authService.logout().catch((error)=>console.log(error))
		.then(
			()=>{
				this.route.navigate(['/login'])
			}
		)
	}
	ngOnInit(){
		// this.activeRoute.paramMap.subscribe(params=>{
		//   this.dato=params.get('data');//data viene de la url, dato es la variable que podemos usar aqui 
		// });
	}
}
