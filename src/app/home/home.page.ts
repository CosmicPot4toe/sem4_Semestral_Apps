import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../Services/fb/auth.service';
import { RamService } from '../Services/api/ram/ram.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	
	@ViewChild('welcom',{ read : ElementRef }) com!:ElementRef;
	private anim!:Animation

	@ViewChild('E',{ read : ElementRef }) E!:ElementRef;
	private EE!:Animation
	
	char:any[] = [];
	args={} as any;

	constructor(private animCtrl:AnimationController,public authService:AuthService
		,public route:Router,private rickNmorty:RamService) {}

	
	ngAfterViewInit(){
		this.anim = this.animCtrl
			.create()
			.addElement(this.com.nativeElement)
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
		this.args.page = 0;
		this.getChars()
	}

	getChars(event?:any){
		this.rickNmorty.getChar(this.args).subscribe({
			next:(res:any)=>{
				this.char.push(...res.results)
				console.log()
			},
			error:(err:any)=>{

			}
			}
		)
	}
}
